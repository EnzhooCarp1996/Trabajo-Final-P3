import express, { Request, Response, NextFunction } from 'express'
import Vote from '../schemas/vote'
import Proposal from '../schemas/proposal'
import { Types } from 'mongoose'
import { CreateVoteRequest } from '../types'
import { sendNotification } from '../utils/sendNotification'

const router = express.Router()
const { ObjectId } = Types

router.get('/:propuestaId', getVotosDePropuesta)
router.get('/:propuestaId/my-vote', getVoteProposalByCompany)
router.post('/:propuestaId', votarPropuesta)

async function getVoteProposalByCompany(
  req: Request<{ propuestaId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).send('No autenticado')
      return
    }

    const vote = await Vote.findOne({
      propuestaId: req.params.propuestaId,
      empresaId: req.user._id,
    })

    res.json({ valor: vote?.valor ?? 0 })
  } catch (err) {
    next(err)
  }
}

async function getVotosDePropuesta(
  req: Request<{ propuestaId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const votos = await Vote.find({
      propuestaId: req.params.propuestaId,
    })
      .populate({ path: 'empresaId', select: 'nombreCompleto' })
      .sort({ createdAt: -1 })

    res.json(votos)
  } catch (err) {
    next(err)
  }
}

async function votarPropuesta(
  req: Request<{ propuestaId: string }, unknown, CreateVoteRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.user) {
    res.status(401).send('No autenticado')
    return
  }

  const empresaId = new Types.ObjectId(req.user._id)
  const { propuestaId } = req.params
  const { valor } = req.body

  try {
    const propuesta = await Proposal.findById(propuestaId)
    if (!propuesta) {
      res.status(404).send('Propuesta not found')
      return
    }

    if (valor < 1 || valor > 5) {
      res.status(400).send('Voto inválido')
      return
    }

    const vote = await Vote.findOneAndUpdate(
      { propuestaId, empresaId },
      { valor },
      { upsert: true, new: true },
    )
    // recalcular métricas
    const stats = await Vote.aggregate([
      { $match: { propuestaId: new ObjectId(propuestaId) } },
      {
        $group: {
          _id: '$propuestaId',
          totalPuntos: { $sum: '$valor' },
        },
      },
    ])

    const puntos = stats[0]?.totalPuntos ?? 0

    await Proposal.findByIdAndUpdate(propuestaId, { puntos })

    const contenido = `Tu propuesta "${propuesta.tituloPropuesta}" recibió ${valor} puntos.`

    await sendNotification({
      toUserId: propuesta.emprendedorId,
      fromUserId: empresaId.toString(),
      contenido,
    })

    res.json(vote)
    console.log('Propuesta votada: ', req.body)
  } catch (err) {
    next(err)
  }
}

export default router
