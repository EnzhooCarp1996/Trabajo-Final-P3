import mongoose, { Schema } from 'mongoose'
import { INotification } from '../types/index'

const { ObjectId } = Schema.Types

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: ObjectId, ref: 'User', required: true },
    fromUserId: { type: ObjectId, ref: 'User', required: true },
    contenido: { type: String, required: true, trim: true, maxlength: 1000 },
    visto: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// Para búsquedas del usuario + no vistas
notificationSchema.index({ userId: 1, visto: 1 })

// Índice compuesto para mejorar búsquedas entre usuarios
notificationSchema.index({ empresaId: 1, emprendedorId: 1 })

const Notification = mongoose.model<INotification>('Message', notificationSchema)

export default Notification
