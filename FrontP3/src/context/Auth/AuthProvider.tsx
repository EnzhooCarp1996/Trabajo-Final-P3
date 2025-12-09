import { getToken, logout as sessionLogout } from '../../services/SessionService'
import { bindNotification, createSocket } from '../../services/SocketService'
import { notificationService } from '../../services/NotificationService'
import { authService } from '../../services/AuthService'
import type { INotification } from '../../types/types'
import { useState, useEffect, useRef } from 'react'
import type { Socket } from 'socket.io-client'
import { AuthContext } from './AuthContext'
import type { ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken())
  const [userInfo, setUserInfo] = useState(authService.getUserInfo())
  const [notifications, setNotifications] = useState<INotification[]>([])
  const socketRef = useRef<Socket | null>(null)

  const login = (newToken: string, recordar: boolean = true) => {
    if (recordar) {
      localStorage.setItem('token', newToken)
    } else {
      sessionStorage.setItem('token', newToken)
    }

    setToken(newToken)
    setUserInfo(authService.getUserInfo())
  }

const logout = () => {
  socketRef.current?.disconnect()
  socketRef.current = null
  sessionLogout()
  setToken(null)
  setUserInfo({ _id: '', email: '', nombre: '', role: '' })
}

  useEffect(() => {
    // Sincronización entre pestañas
    const handleStorage = () => {
      const t = getToken()
      setToken(t)
      setUserInfo(authService.getUserInfo())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (!userInfo._id) return
    notificationService.getAll({ toUserId: userInfo._id }).then((res) => setNotifications(res))
  }, [userInfo._id])


useEffect(() => {
  if (!token || !userInfo._id || socketRef.current) return

  const socket = createSocket(userInfo._id)
  socketRef.current = socket

  bindNotification(socket, (data) => {
    setNotifications((prev) => [data, ...prev])
  })

  return () => {
    socket.disconnect()
    socketRef.current = null
  }
}, [token, userInfo._id])


  const handleMarkAsSeen = (id: string) => {
    notificationService.markAsSeen(id)
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, visto: true } : n)))
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        _id: userInfo._id,
        email: userInfo.email,
        nombre: userInfo.nombre,
        role: userInfo.role,
        notifications,
        handleMarkAsSeen,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
