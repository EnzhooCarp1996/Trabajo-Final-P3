import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import { Types } from 'mongoose'

let io: Server

export const initSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado:', socket.id)

    socket.on('join', ({ userId }) => {
      if (!userId || !Types.ObjectId.isValid(userId)) {
        console.log('❌ join con userId inválido:', userId)
        return
      }

      socket.join(userId.toString())
    })

    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id)
    })
  })

  return io
}

export { io }
