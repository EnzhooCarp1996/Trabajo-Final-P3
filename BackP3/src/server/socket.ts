import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'

let io: Server

export const initSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  })

  io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado:", socket.id)

    socket.on("join", ({ userId }) => {
      console.log("📩 EVENTO JOIN RECIBIDO:", { socketId: socket.id, userId })

      if (!userId) {
        console.log("❌ join recibido SIN userId")
        return
      }

      socket.join(userId)
      console.log(`📨 Usuario ${userId} fue unido a la sala privada`)
    })

    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado:", socket.id)
    })
  })

  return io
}

export { io }
