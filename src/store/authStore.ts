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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await axios.get(`${apiUrl}/api/auth/me`, { withCredentials: true })
      set({ user: response.data, isLoading: false })
    } catch (error) {
      console.log('Auth check failed:', error)
      set({ user: null, isLoading: false })
    }
  },
  
  logout: async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      await axios.post(`${apiUrl}/api/auth/logout`, {}, { withCredentials: true })
      set({ user: null })
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
      // Even if logout fails, clear user state
      set({ user: null })
      window.location.href = '/'
    }
  }
}))
