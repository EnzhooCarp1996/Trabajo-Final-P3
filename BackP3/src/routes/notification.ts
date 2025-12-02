import express, { Request, Response, NextFunction } from 'express'
import Notification from '../schemas/notification'
import User from '../schemas/user'
import { INotification } from '../types/index'

const router = express.Router()

router.get('/', getAllNotifications)
router.get('/:id', getNotificationById)
router.post('/', createNotification)
router.put('/:id/visto', markAsSeen)

//  ===========================
//  GET: Todas las notificaciones del usuario
//  =========================== 
async function getAllNotifications(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' })
      return
    }

    const notificaciones = await Notification.find({ userId })
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
    const noti = await Notification.findById(req.params.id)
      .populate({ path: 'fromUserId', select: 'nombreCompleto nombreEmpresa' })

    if (!noti) {
      res.status(404).json({ error: 'Notificación no encontrada' })
      return
    }

    // Solo el dueño puede verla
    if (noti.userId.toString() !== req.user?._id.toString()) {
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
  req: Request<Record<string, never>, unknown, INotification>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { userId, fromUserId, contenido } = req.body

  try {
    // Validar usuarios
    const receptor = await User.findById(userId)
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
      userId,
      fromUserId,
      contenido,
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
    if (noti.userId.toString() !== req.user?._id.toString()) {
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
