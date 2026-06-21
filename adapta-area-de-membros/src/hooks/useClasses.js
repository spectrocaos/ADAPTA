import { useState, useEffect, useCallback } from 'react'
import { collection, query, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from './useAuth'

export function useClasses() {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])

  // Sincronizar Turmas do Firestore
  useEffect(() => {
    if (!user?.id) return

    const q = query(collection(db, 'classes'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = []
      snapshot.forEach(doc => {
        const data = doc.data()
        // Se for professor, filtra por teacherId
        if (user.profile === 'teacher') {
          if (data.teacherId === user.id) {
            list.push({ id: doc.id, ...data })
          }
        } else {
          // Se for aluno, verifica se ele está matriculado pelo nome ou ID
          const isEnrolled = data.students?.some(
            s => s.id === user.id || s.name?.toLowerCase() === user.name?.toLowerCase()
          )
          if (isEnrolled) {
            list.push({ id: doc.id, ...data })
          }
        }
      })
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setClasses(list)
    })

    return () => unsubscribe()
  }, [user])

  // ── Turmas ────────────────────────────────────────────────────────────────

  const createClass = useCallback(async (name, grade, description) => {
    if (!user?.id) return
    const newClass = {
      createdAt: new Date().toISOString(),
      teacherId: user.id,
      name,
      grade,
      description,
      students: [],
      sharedMaterials: []
    }
    await addDoc(collection(db, 'classes'), newClass)
  }, [user])

  const deleteClass = useCallback(async (id) => {
    await deleteDoc(doc(db, 'classes', id))
  }, [])

  const getClassById = useCallback((id) => {
    return classes.find(c => c.id === id)
  }, [classes])

  // ── Alunos ────────────────────────────────────────────────────────────────

  const addStudent = useCallback(async (classId, studentName, condition) => {
    const student = {
      id: crypto.randomUUID(),
      name: studentName,
      condition,
      sharedMaterials: []
    }
    const classDocRef = doc(db, 'classes', classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass) {
      await updateDoc(classDocRef, {
        students: [...targetClass.students, student]
      })
    }
  }, [classes])

  const removeStudent = useCallback(async (classId, studentId) => {
    const classDocRef = doc(db, 'classes', classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass) {
      await updateDoc(classDocRef, {
        students: targetClass.students.filter(s => s.id !== studentId)
      })
    }
  }, [classes])

  // ── Compartilhamento ──────────────────────────────────────────────────────

  const shareMaterial = useCallback(async (classId, materialId) => {
    const classDocRef = doc(db, 'classes', classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass && !targetClass.sharedMaterials.includes(materialId)) {
      await updateDoc(classDocRef, {
        sharedMaterials: [...targetClass.sharedMaterials, materialId]
      })
    }
  }, [classes])

  const unshareMaterial = useCallback(async (classId, materialId) => {
    const classDocRef = doc(db, 'classes', classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass) {
      await updateDoc(classDocRef, {
        sharedMaterials: targetClass.sharedMaterials.filter(id => id !== materialId)
      })
    }
  }, [classes])

  const shareMaterialWithStudent = useCallback(async (classId, studentId, materialId) => {
    const classDocRef = doc(db, 'classes', classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass) {
      const updatedStudents = targetClass.students.map(s => {
        if (s.id === studentId) {
          const list = s.sharedMaterials || []
          if (!list.includes(materialId)) {
            return { ...s, sharedMaterials: [...list, materialId] }
          }
        }
        return s
      })
      await updateDoc(classDocRef, { students: updatedStudents })
    }
  }, [classes])

  const unshareMaterialWithStudent = useCallback(async (classId, studentId, materialId) => {
    const classDocRef = doc(db, 'classes', classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass) {
      const updatedStudents = targetClass.students.map(s => {
        if (s.id === studentId) {
          const list = s.sharedMaterials || []
          return { ...s, sharedMaterials: list.filter(id => id !== materialId) }
        }
        return s
      })
      await updateDoc(classDocRef, { students: updatedStudents })
    }
  }, [classes])

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
