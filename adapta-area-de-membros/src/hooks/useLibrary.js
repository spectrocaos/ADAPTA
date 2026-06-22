import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'

export function useLibrary() {
  const { user } = useAuth()
  const [materials, setMaterials] = useState([])
  const [profiles, setProfiles] = useState([])

  // Sincronizar Materiais
  useEffect(() => {
    if (!user?.id) return

    const loadMaterials = () => {
      const stored = localStorage.getItem('adapta_materials')
      let list = stored ? JSON.parse(stored) : []
      
      if (user.profile === 'teacher') {
        list = list.filter(m => m.createdBy === user.id)
      }
      
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setMaterials(list)
    }

    loadMaterials()
    
    // Configurar listener para atualizações de outras janelas/abas
    window.addEventListener('storage', loadMaterials)
    
    // Criamos um evento customizado para mesma aba
    window.addEventListener('adapta_materials_changed', loadMaterials)

    return () => {
      window.removeEventListener('storage', loadMaterials)
      window.removeEventListener('adapta_materials_changed', loadMaterials)
    }
  }, [user])

  // Sincronizar Perfis de Conversão (apenas para Professor)
  useEffect(() => {
    if (!user?.id || user.profile !== 'teacher') return

    const loadProfiles = () => {
      const stored = localStorage.getItem('adapta_profiles')
      let list = stored ? JSON.parse(stored) : []
      
      list = list.filter(p => p.createdBy === user.id)
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setProfiles(list)
    }

    loadProfiles()
    window.addEventListener('storage', loadProfiles)
    window.addEventListener('adapta_profiles_changed', loadProfiles)

    return () => {
      window.removeEventListener('storage', loadProfiles)
      window.removeEventListener('adapta_profiles_changed', loadProfiles)
    }
  }, [user])

  // ── Salvar/Deletar Materiais ──────────────────────────────────────────────
  
  const saveMaterial = useCallback(async (materialData) => {
    if (!user?.id) return
    const newMaterial = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      ...materialData
    }
    
    const stored = localStorage.getItem('adapta_materials')
    const list = stored ? JSON.parse(stored) : []
    list.push(newMaterial)
    
    localStorage.setItem('adapta_materials', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_materials_changed'))
  }, [user])

  const deleteMaterial = useCallback(async (id) => {
    const stored = localStorage.getItem('adapta_materials')
    if (!stored) return
    let list = JSON.parse(stored)
    list = list.filter(m => m.id !== id)
    localStorage.setItem('adapta_materials', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_materials_changed'))
  }, [])

  // ── Salvar/Deletar Perfis de Conversão ────────────────────────────────────

  const saveProfile = useCallback(async (name, condition, params, description = '') => {
    if (!user?.id) return
    const newProfile = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      name,
      condition,
      params,
      description
    }
    
    const stored = localStorage.getItem('adapta_profiles')
    const list = stored ? JSON.parse(stored) : []
    list.push(newProfile)
    
    localStorage.setItem('adapta_profiles', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_profiles_changed'))
  }, [user])

  const deleteProfile = useCallback(async (id) => {
    const stored = localStorage.getItem('adapta_profiles')
    if (!stored) return
    let list = JSON.parse(stored)
    list = list.filter(p => p.id !== id)
    localStorage.setItem('adapta_profiles', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_profiles_changed'))
  }, [])

  return {
    materials,
    saveMaterial,
    deleteMaterial,
    profiles,
    saveProfile,
    deleteProfile
  }
}
