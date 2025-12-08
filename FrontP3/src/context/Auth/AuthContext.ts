import { createContext } from 'react'
import type { INotification } from '../../types/types'

interface AuthContextType {
  token: string | null
  _id: string
  email: string
  nombre: string
  role: string
  notifications: INotification[]
  handleMarkAsSeen: (id: string) => void
  login: (token: string, recordar?: boolean) => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
