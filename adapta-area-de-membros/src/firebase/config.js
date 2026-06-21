import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuração do Firebase usando variáveis de ambiente do Vite (ou fallbacks para não quebrar a aplicação)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key-adapta",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "adapta-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "adapta-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "adapta-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar e exportar instâncias dos serviços
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
