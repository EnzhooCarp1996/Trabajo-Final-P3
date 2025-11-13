import express, { Request, Response, NextFunction } from 'express'
import Message from '../schemas/message'
import User from '../schemas/user'
import Challenge from '../schemas/challenge'
import { CreateMessageRequest, IMessage } from '../types/index'

const router = express.Router()

router.get('/', getAllMessages)
router.get('/:id', getMessageById)
router.post('/', createMessage)
router.put('/:id', updateMessage)

async function getAllMessages(
  req: Request<{ propuestaId?: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { propuestaId } = req.query
    const filter: any = {}

    // Si por alguna razón no hay usuario autenticado (no debería pasar)
    // if (!req.user) {
    //   res.status(401).json({ error: 'Usuario no autenticado' })
    //   return
    // }

    // Si el usuario está logueado, filtrar según su rol
    // if (req.user?.role === 'empresa') {
    //   filter.empresaId = req.user._id
    // } else if (req.user?.role === 'emprendedor') {
    //   filter.emprendedorId = req.user._id
    // }

    // Si viene propuestaId se agrega al filtro
    if (propuestaId) {
      filter.propuestaId = propuestaId
    }

    // Buscar los mensajes filtrados
    const messages = await Message.find(filter)
      .populate({ path: 'empresaId', select: 'nombreEmpresa' })
      .populate({ path: 'emprendedorId', select: 'nombreCompleto' })
      .populate({ path: 'propuestaId', select: 'titulo' })

    res.status(200).json(messages)
  } catch (err) {
    next(err)
  }
}

async function getMessageById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const message = await Message.findById(req.params.id)
      .populate({ path: "empresaId", select: "nombreEmpresa" })
      .populate({ path: "emprendedorId", select: "nombreCompleto" })
      .populate({ path: "propuestaId", select: "titulo" });

    if (!message) {
      res.status(404).json({ error: "Mensaje no encontrado" });
      return;
    }

    // Solo el dueño del mensaje puede verlo
    const userId = req.user?._id.toString();

    // const isOwner =
    //   message.empresaId?.toString() === userId ||
    //   message.emprendedorId?.toString() === userId;

    // if (!isOwner) {
    //   res.status(403).json({ error: "No autorizado para ver este mensaje" });
    //   return;
    // }
        // Si lo ve el emprendedor, marcarlo como leído
    // if (message.emprendedorId.toString() === userId && !message.visto) {
    //   message.visto = true;
    //   await message.save();
    // }

    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
}


async function createMessage(
  req: Request<Record<string, never>, unknown, CreateMessageRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { empresaId, emprendedorId, propuestaId } = req.body

  try {
    // Validar si existe la empresa
    const empresa = await User.findById(empresaId)
    if (!empresa) {
      res.status(404).send('Empresa not found')
      return
    }
    // Validar si existe emprendedor
    const emprendedor = await User.findById(emprendedorId)
    if (!emprendedor) {
      res.status(404).send('Emprendedor not found')
      return
    }
    // Validar si existe desafio
    const proposal = await Challenge.findById(propuestaId)
    if (!proposal) {
      res.status(404).send('Propuesta not found')
      return
    }
    // Crear el mensaje
    const messageCreated = await Message.create(req.body)

    res.send(messageCreated)
    console.log('Mensaje creado: ', req.body)
  } catch (err) {
    next(err)
  }
}

// Actualizar un mensaje
async function updateMessage(
  req: Request<{ id: string }, unknown, Partial<CreateMessageRequest>>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Actualizar mensaje con id: ', req.params.id)

  try {
    const messageToUpdate = await Message.findById(req.params.id)

    if (!messageToUpdate) {
      console.error('Mensaje not found')
      res.status(404).send('Mensaje not found')
      return
    }

    // 🔒 Solo el usuario empresa dueño puede modificarlo
    // if (messageToUpdate.empresaId.toString() !== req.user?._id.toString()) {
    //   res.status(403).send('No autorizado para modificar este desafío')
    //   return
    // }

    delete req.body.empresaId
    delete req.body.emprendedorId
    delete req.body.propuestaId
    messageToUpdate.visto = false;

    Object.assign(messageToUpdate, req.body)
    await messageToUpdate.save()

    res.send(messageToUpdate)
    console.log('Mensaje actualizado:', req.body)
  } catch (err) {
    next(err)
  }
}

export default router
