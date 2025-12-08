import Notification from '../schemas/notification'
import { io } from '../server/socket'
import { Types } from 'mongoose'

interface SendNotificationParams {
  toUserId: Types.ObjectId
  fromUserId: string
  contenido: string
}

export async function sendNotification({
  toUserId,
  fromUserId,
  contenido,
}: SendNotificationParams): Promise<void> {
  const noti = await Notification.create({
    toUserId,
    fromUserId,
    contenido,
  })

  try {
    io.to(toUserId.toString()).emit('notification:new', {
      _id: noti._id,
      contenido: noti.contenido,
      fromUserId,
      createdAt: noti.createdAt,
    })
  } catch (e) {
    console.warn('Socket emit failed', e)
  }
}
