import { useState, useEffect, useCallback } from 'react'
import { collection, query, where, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from './useAuth'

export function useLibrary() {
  const { user } = useAuth()
  const [materials, setMaterials] = useState([])
  const [profiles, setProfiles] = useState([])

  // Sincronizar Materiais
  useEffect(() => {
    if (!user?.id) return

    let q
    if (user.profile === 'teacher') {
      // Professores veem apenas seus materiais criados
      q = query(collection(db, 'materials'), where('createdBy', '==', user.id))
    } else {
      // Alunos veem todos os materiais adaptados
      q = query(collection(db, 'materials'))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = []
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() })
      })
      // Ordenar por data decrescente
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setMaterials(list)
    })

    return () => unsubscribe()
  }, [user])

  // Sincronizar Perfis de Conversão (apenas para Professor)
  useEffect(() => {
    if (!user?.id || user.profile !== 'teacher') return

    const q = query(collection(db, 'profiles'), where('createdBy', '==', user.id))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = []
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() })
      })
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setProfiles(list)
    })

    return () => unsubscribe()
  }, [user])

  // ── Salvar/Deletar Materiais ──────────────────────────────────────────────
  
  const saveMaterial = useCallback(async (materialData) => {
    if (!user?.id) return
    const newMaterial = {
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      ...materialData
    }
    await addDoc(collection(db, 'materials'), newMaterial)
  }, [user])

  const deleteMaterial = useCallback(async (id) => {
    await deleteDoc(doc(db, 'materials', id))
  }, [])

  // ── Salvar/Deletar Perfis de Conversão ────────────────────────────────────

  const saveProfile = useCallback(async (name, condition, params, description = '') => {
    if (!user?.id) return
    const newProfile = {
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      name,
      condition,
      params,
      description
    }
    await addDoc(collection(db, 'profiles'), newProfile)
  }, [user])

  const deleteProfile = useCallback(async (id) => {
    await deleteDoc(doc(db, 'profiles', id))
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
