import { io, Socket } from 'socket.io-client'
import { getToken } from './SessionService'
import type { INotification } from '../types/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function createSocket(userId: string): Socket {
  const socket = io(API_BASE_URL, {
    auth: { token: getToken() },
    autoConnect: true,
  })

  socket.on('connect', () => {
    console.log('🟢 SOCKET CONNECTED:', socket.id)
    socket.emit('join', { userId })
  })
  socket.on('reconnect', () => {
    console.log('♻ Reconnected')
    socket.emit('join', { userId })
  })
  return socket
}

export function disconnectSocket(socket?: Socket | null) {
  if (socket) socket.disconnect()
}

export function bindNotification(socket: Socket, callback: (data: INotification) => void) {
  socket.on('notification:new', callback)
}
