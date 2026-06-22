import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'

export function useClasses() {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])

  // Sincronizar Turmas
  useEffect(() => {
    if (!user?.id) return

    const loadClasses = () => {
      const stored = localStorage.getItem('adapta_classes')
      let list = stored ? JSON.parse(stored) : []
      
      if (user.profile === 'teacher') {
        // Professor vê as turmas que ele criou
        list = list.filter(c => c.teacherId === user.id)
      } else {
        // Aluno vê as turmas em que está matriculado
        list = list.filter(c => c.students?.some(s => s.id === user.id || s.name?.toLowerCase() === user.name?.toLowerCase()))
      }
      
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setClasses(list)
    }

    loadClasses()
    window.addEventListener('storage', loadClasses)
    window.addEventListener('adapta_classes_changed', loadClasses)

    return () => {
      window.removeEventListener('storage', loadClasses)
      window.removeEventListener('adapta_classes_changed', loadClasses)
    }
  }, [user])

  // ── Operações CRUD ────────────────────────────────────────────────────────
  
  const createClass = useCallback(async (name, subject, description = '') => {
    if (!user?.id || user.profile !== 'teacher') return
    const newClass = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      teacherId: user.id,
      name,
      subject,
      description,
      students: [],
      sharedMaterials: []
    }
    
    const stored = localStorage.getItem('adapta_classes')
    const list = stored ? JSON.parse(stored) : []
    list.push(newClass)
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [user])

  const deleteClass = useCallback(async (id) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    list = list.filter(c => c.id !== id)
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  const getClassById = useCallback((id) => {
    return classes.find(c => c.id === id)
  }, [classes])

  // ── Alunos ────────────────────────────────────────────────────────────────

  const addStudent = useCallback(async (classId, studentName, condition) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    
    const classIndex = list.findIndex(c => c.id === classId)
    if (classIndex === -1) return
    
    const newStudent = {
      id: crypto.randomUUID(),
      name: studentName,
      condition,
      sharedMaterials: []
    }
    
    list[classIndex].students = list[classIndex].students || []
    list[classIndex].students.push(newStudent)
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  const removeStudent = useCallback(async (classId, studentId) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    
    const classIndex = list.findIndex(c => c.id === classId)
    if (classIndex === -1) return
    
    list[classIndex].students = list[classIndex].students?.filter(s => s.id !== studentId) || []
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  // ── Compartilhamento ──────────────────────────────────────────────────────

  const shareMaterial = useCallback(async (classId, materialId) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    
    const classIndex = list.findIndex(c => c.id === classId)
    if (classIndex === -1) return
    
    list[classIndex].sharedMaterials = list[classIndex].sharedMaterials || []
    if (!list[classIndex].sharedMaterials.includes(materialId)) {
      list[classIndex].sharedMaterials.push(materialId)
    }
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  const unshareMaterial = useCallback(async (classId, materialId) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    
    const classIndex = list.findIndex(c => c.id === classId)
    if (classIndex === -1) return
    
    list[classIndex].sharedMaterials = list[classIndex].sharedMaterials?.filter(id => id !== materialId) || []
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  const shareMaterialWithStudent = useCallback(async (classId, studentId, materialId) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    
    const classIndex = list.findIndex(c => c.id === classId)
    if (classIndex === -1) return
    
    const studentIndex = list[classIndex].students?.findIndex(s => s.id === studentId)
    if (studentIndex !== undefined && studentIndex !== -1) {
      const student = list[classIndex].students[studentIndex]
      student.sharedMaterials = student.sharedMaterials || []
      if (!student.sharedMaterials.includes(materialId)) {
        student.sharedMaterials.push(materialId)
      }
    }
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  const unshareMaterialWithStudent = useCallback(async (classId, studentId, materialId) => {
    const stored = localStorage.getItem('adapta_classes')
    if (!stored) return
    let list = JSON.parse(stored)
    
    const classIndex = list.findIndex(c => c.id === classId)
    if (classIndex === -1) return
    
    const studentIndex = list[classIndex].students?.findIndex(s => s.id === studentId)
    if (studentIndex !== undefined && studentIndex !== -1) {
      const student = list[classIndex].students[studentIndex]
      student.sharedMaterials = student.sharedMaterials?.filter(id => id !== materialId) || []
    }
    
    localStorage.setItem('adapta_classes', JSON.stringify(list))
    window.dispatchEvent(new Event('adapta_classes_changed'))
  }, [])

  return {
    classes,
    createClass,
    deleteClass,
    getClassById,
    addStudent,
    removeStudent,
    shareMaterial,
    unshareMaterial,
    shareMaterialWithStudent,
    unshareMaterialWithStudent
  }
}
