import express, { Request, Response, NextFunction } from 'express'
import Notification from '../schemas/notification'
import User from '../schemas/user'
import { CreateNotificationRequest } from '../types/index'
import { io } from '../server/socket'

const router = express.Router()

router.get('/', getAllNotifications)
router.get('/:id', getNotificationById)
router.post('/', createNotification)
router.put('/:id/visto', markAsSeen)

//  ===========================
//  GET: Todas las notificaciones del usuario
//  ===========================
async function getAllNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' })
      return
    }

    const notificaciones = await Notification.find({ toUserId: userId })
      .populate({ path: 'fromUserId', select: 'nombreCompleto nombreEmpresa' })
      .sort({ createdAt: -1 })

    res.status(200).json(notificaciones)
  } catch (err) {
    next(err)
  }
}

//  ===========================
//  GET: Notificación por ID
//  ===========================
async function getNotificationById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const noti = await Notification.findById(req.params.id).populate({
      path: 'fromUserId',
      select: 'nombreCompleto nombreEmpresa',
    })

    if (!noti) {
      res.status(404).json({ error: 'Notificación no encontrada' })
      return
    }

    // Solo el dueño puede verla
    if (noti.toUserId.toString() !== req.user?._id.toString()) {
      res.status(403).json({ error: 'No autorizado' })
      return
    }

    // Marcar como vista automáticamente al abrirla
    if (!noti.visto) {
      noti.visto = true
      await noti.save()
    }

    res.status(200).json(noti)
  } catch (err) {
    next(err)
  }
}

//  ===========================
//  POST: Crear notificación
//  ===========================
async function createNotification(
  req: Request<Record<string, never>, unknown, CreateNotificationRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { toUserId, fromUserId, contenido } = req.body

  try {
    // Validar usuarios
    const receptor = await User.findById(toUserId)
    const remitente = await User.findById(fromUserId)

    if (!receptor) {
      res.status(404).send('Receptor no encontrado')
      return
    }
    if (!remitente) {
      res.status(404).send('Remitente no encontrado')
      return
    }

    const noti = await Notification.create({
      toUserId,
      fromUserId,
      contenido,
    })

    io.to(toUserId.toString()).emit('notification:new', {
      _id: noti._id,
      contenido: noti.contenido,
      fromUserId: noti.fromUserId,
      createdAt: noti.createdAt,
    })

    res.status(201).json(noti)
  } catch (err) {
    next(err)
  }
}

// ===========================
// PUT: Marcar como vista
// ===========================
async function markAsSeen(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const noti = await Notification.findById(req.params.id)

    if (!noti) {
      res.status(404).send('Notificación no encontrada')
      return
    }

    // Solo el destinatario puede marcarla como vista
    if (noti.toUserId.toString() !== req.user?._id.toString()) {
      res.status(403).send('No autorizado')
      return
    }

    noti.visto = true
    await noti.save()

    res.json(noti)
  } catch (err) {
    next(err)
  }
}

export default router
