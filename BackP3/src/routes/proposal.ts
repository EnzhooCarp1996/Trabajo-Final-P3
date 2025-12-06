import express, { Request, Response, NextFunction } from 'express'
import Proposal from '../schemas/proposal'
import User from '../schemas/user'
import Challenge from '../schemas/challenge'
import { CreateProposalRequest, IProposal, ProposalStatus } from '../types'
import Notification from '../schemas/notification'
import { io } from '../server/socket'

const router = express.Router()

// Rutas
router.get('/', getAllProposals)
router.get('/:id', getProposalById)
router.post('/', createProposal)
router.put('/:id', updateProposal)
router.put('/:id/estado', updateProposalStatus)
router.delete('/:id', deleteProposal)

// Obtener todas las propuestas, o por emprendedor
async function getAllProposals(
  req: Request<{}, {}, {}, { estado?: ProposalStatus; desafioId?: string; emprendedorId?: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { estado, desafioId, emprendedorId } = req.query

  try {
    const filter: any = {}

    if (estado && ['en revision', 'seleccionada', 'descartada'].includes(estado))
      filter.estado = estado

    if (desafioId) filter.desafioId = desafioId

    if (emprendedorId) filter.emprendedorId = emprendedorId

    const proposals = await Proposal.find(filter)
      .populate({ path: 'emprendedorId', select: 'nombreCompleto' })
      .populate({ path: 'desafioId', select: 'titulo' })

    res.send(proposals)
  } catch (err) {
    next(err)
  }
}

// Obtener una propuesta por ID
async function getProposalById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Obtener propuesta con id: ', req.params.id)

  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate({ path: 'emprendedorId', select: 'nombreCompleto' })
      .populate({ path: 'desafioId', select: 'titulo' })

    if (!proposal) {
      res.status(404).send('Proposal not found')
      return
    }

    res.send(proposal)
  } catch (err) {
    next(err)
  }
}

async function createProposal(
  req: Request<Record<string, never>, unknown, CreateProposalRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { desafioId, emprendedorId } = req.body

  try {
    const desafio = await Challenge.findById(desafioId)
    if (!desafio) {
      res.status(404).send('Desafio not found')
      return
    }
    const empresaId = desafio.empresaId.toString()

    const emprendedor = await User.findById(emprendedorId)
    if (!emprendedor) {
      res.status(404).send('Emprendedor not found')
      return
    }

    const proposalCreated = await Proposal.create(req.body)
    const contenido = `Recibiste una propuesta al desafío "${desafio.titulo}".`

    const noti = await Notification.create({
      toUserId: desafio.empresaId, // Empresa recibe
      fromUserId: emprendedorId, // Emprendedor envía
      contenido,
    })

    io.to(desafio.empresaId.toString()).emit('notification:new', {
      _id: noti._id,
      contenido: noti.contenido,
      fromUserId: emprendedorId,
      createdAt: noti.createdAt,
    })

    res.send(proposalCreated)
    console.log('Propuesta creada: ', req.body)
  } catch (err) {
    next(err)
  }
}

// Actualizar una propuesta
async function updateProposal(
  req: Request<{ id: string }, unknown, Partial<CreateProposalRequest>>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Actualizar propuesta con id: ', req.params.id)

  try {
    const proposalToUpdate = await Proposal.findById(req.params.id)

    if (!proposalToUpdate) {
      console.error('Propuesta not found')
      res.status(404).send('Propuesta not found')
      return
    }

    // solo el emprendedor dueño pueda actualizar
    if (req.user?._id.toString() !== proposalToUpdate.emprendedorId.toString()) {
      res.status(403).send('No autorizado para eliminar esta propuesta')
      return
    }
    delete req.body.desafioId
    delete req.body.emprendedorId

    Object.assign(proposalToUpdate, req.body)
    await proposalToUpdate.save()

    res.send(proposalToUpdate)
    console.log('Propuesta actualizada: ', req.body)
  } catch (err) {
    next(err)
  }
}

// Eliminar una propuesta
async function deleteProposal(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Propuesta eliminada con id: ', req.params.id)

  try {
    const proposal = await Proposal.findById(req.params.id)

    if (!proposal) {
      res.status(404).send('Propuesta not found')
      return
    }

    // solo el emprendedor dueño pueda actualizar
    if (req.user?._id.toString() !== proposal.emprendedorId.toString()) {
      res.status(403).send('No autorizado para eliminar esta propuesta')
      return
    }

    await Proposal.deleteOne({ _id: proposal._id })

    res.send(`Propuesta eliminada: ${req.params.id}`)
  } catch (err) {
    next(err)
  }
}

async function updateProposalStatus(
  req: Request<{ id: string }, unknown, { estado: ProposalStatus }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { estado } = req.body;

    const proposal = await Proposal.findById(req.params.id)
      .populate('desafioId')
      .populate('emprendedorId');

    if (!proposal) {
      res.status(404).send('Proposal not found');
      return;
    }

    const desafio: any = proposal.desafioId;

    // Solo la empresa dueña del desafío puede cambiar el estado
    if (req.user?._id.toString() !== desafio.empresaId.toString()) {
      res.status(403).send('No autorizado para modificar el estado');
      return;
    }

    // Cambiar estado
    proposal.estado = estado;
    await proposal.save();

    // Crear notificación al emprendedor
    const contenido = `Tu propuesta al desafío "${desafio.titulo}" fue marcada como "${estado}".`;

    const noti = await Notification.create({
      toUserId: proposal.emprendedorId,
      fromUserId: req.user!._id,
      contenido,
    });

    // Emitir por socket
    io.to(proposal.emprendedorId.toString()).emit('notification:new', {
      _id: noti._id,
      contenido: noti.contenido,
      fromUserId: req.user!._id,
      createdAt: noti.createdAt,
    });

    res.json(proposal);
  } catch (err) {
    next(err);
  }
}


export default router
