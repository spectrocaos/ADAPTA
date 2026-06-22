import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    // Carregar usuário do localStorage
    const savedUser = localStorage.getItem('adapta_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  async function register({ name, email, password, profile, condition }) {
    // Simula delay de rede
    await new Promise(r => setTimeout(r, 600))
    
    // Validar se email já existe
    const existingUsersStr = localStorage.getItem('adapta_all_users') || '[]'
    const existingUsers = JSON.parse(existingUsersStr)
    if (existingUsers.some(u => u.email === email)) {
      throw new Error('Firebase: Error (auth/email-already-in-use).') // Simulando o mesmo erro do firebase para manter compatibilidade com a UI
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password, // Não seguro para prod, mas ok para local mock
      profile,
      condition: condition || null,
      onboarded: false,
      createdAt: new Date().toISOString(),
    }

    existingUsers.push(newUser)
    localStorage.setItem('adapta_all_users', JSON.stringify(existingUsers))
    localStorage.setItem('adapta_user', JSON.stringify(newUser))
    setUser(newUser)
    return { success: true, user: newUser }
  }

  async function login({ email, password }) {
    await new Promise(r => setTimeout(r, 600))
    const existingUsersStr = localStorage.getItem('adapta_all_users') || '[]'
    const existingUsers = JSON.parse(existingUsersStr)
    
    const u = existingUsers.find(u => u.email === email && u.password === password)
    if (u) {
      localStorage.setItem('adapta_user', JSON.stringify(u))
      setUser(u)
      return { success: true, user: u }
    }
    return { success: false, error: 'E-mail ou senha inválidos.' }
  }

  async function logout() {
    localStorage.removeItem('adapta_user')
    setUser(null)
  }

  async function updateUser(updates) {
    if (!user?.id) return
    const updated = { ...user, ...updates }
    localStorage.setItem('adapta_user', JSON.stringify(updated))
    setUser(updated)
    
    // Atualiza também na lista global
    const existingUsersStr = localStorage.getItem('adapta_all_users') || '[]'
    let existingUsers = JSON.parse(existingUsersStr)
    existingUsers = existingUsers.map(u => u.id === updated.id ? updated : u)
    localStorage.setItem('adapta_all_users', JSON.stringify(existingUsers))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
