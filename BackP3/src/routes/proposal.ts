import express, { Request, Response, NextFunction } from 'express'
import Proposal from '../schemas/proposal'
import User from '../schemas/user'
import Challenge from '../schemas/challenge'
import { CreateProposalRequest, IProposal, ProposalStatus } from '../types'

const router = express.Router()

// Rutas
router.get('/', getAllProposals)
router.get('/:id', getProposalById)
router.post('/', createProposal)
router.put('/:id', updateProposal)
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
  console.log('Propuesta creada: ', req.body)

  const { desafioId, emprendedorId } = req.body

  try {
    const desafio = await Challenge.findById(desafioId)
    if (!desafio) {
      res.status(404).send('Desafio not found')
      return
    }

    const emprendedor = await User.findById(emprendedorId)
    if (!emprendedor) {
      res.status(404).send('Emprendedor not found')
      return
    }

    const proposalCreated = await Proposal.create(req.body)

    res.send(proposalCreated)
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

    // Opcional: validar permisos
    // solo el emprendedor dueño o un admin pueda actualizar
    // if (!req.isAdmin?.() && req.user?._id !== proposal.emprendedorId.toString()) {
    //   res.status(403).send("Unauthorized");
    //   return;
    // }

    Object.assign(proposalToUpdate, req.body)
    await proposalToUpdate.save()

    res.send(proposalToUpdate)
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

    await Proposal.deleteOne({ _id: proposal._id })

    res.send(`Propuesta eliminada: ${req.params.id}`)
  } catch (err) {
    next(err)
  }
}

export default router
