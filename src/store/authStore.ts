import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  username: string
  email: string
  avatarUrl: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  
  checkAuth: async () => {
    try {
      const response = await axios.get('/api/auth/me', { withCredentials: true })
      set({ user: response.data, isLoading: false })
    } catch (error) {
      set({ user: null, isLoading: false })
    }
  },
  
  logout: async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true })
      set({ user: null })
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
}))
