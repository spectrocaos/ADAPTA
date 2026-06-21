import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            setUser(userDoc.data())
          } else {
            setUser(null)
          }
        } catch {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  async function register({ name, email, password, profile, condition }) {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = {
        id: credentials.user.uid,
        name,
        email,
        profile, // 'teacher' | 'student'
        condition: condition || null,
        onboarded: false,
        createdAt: new Date().toISOString(),
      }
      await setDoc(doc(db, 'users', credentials.user.uid), newUser)
      setUser(newUser)
      return { success: true, user: newUser }
    } catch (err) {
      throw err
    }
  }

  async function login({ email, password }) {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'users', credentials.user.uid))
      if (userDoc.exists()) {
        const u = userDoc.data()
        setUser(u)
        return { success: true, user: u }
      }
      return { success: false, error: 'Perfil do usuário não encontrado.' }
    } catch (err) {
      return { success: false, error: 'E-mail ou senha inválidos.' }
    }
  }

  async function loginWithGoogle(defaultProfile = 'student') {
    const provider = new GoogleAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      const userDocRef = doc(db, 'users', credentials.user.uid)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        const u = userDoc.data()
        setUser(u)
        return { success: true, user: u, isNew: false }
      } else {
        // Retorna isNew: true e os dados do Google para cadastrar no passo seguinte
        return {
          success: true,
          isNew: true,
          user: {
            id: credentials.user.uid,
            name: credentials.user.displayName || 'Usuário Google',
            email: credentials.user.email,
            photoUrl: credentials.user.photoURL || '',
          }
        }
      }
    } catch (err) {
      return { success: false, error: err.message || 'Erro ao entrar com o Google.' }
    }
  }

  async function registerWithGoogle(uid, userData) {
    try {
      const userDocRef = doc(db, 'users', uid)
      const newUser = {
        id: uid,
        ...userData,
        onboarded: false,
        createdAt: new Date().toISOString(),
      }
      await setDoc(userDocRef, newUser)
      setUser(newUser)
      return { success: true, user: newUser }
    } catch (err) {
      return { success: false, error: err.message || 'Erro ao concluir cadastro.' }
    }
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
  }

  async function updateUser(updates) {
    if (!user?.id) return
    const updated = { ...user, ...updates }
    await updateDoc(doc(db, 'users', user.id), updates)
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, updateUser, loginWithGoogle, registerWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
