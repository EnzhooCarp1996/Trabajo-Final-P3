import express, { Request, Response, NextFunction } from 'express'
import Challenge from '../schemas/challenge'
import User from '../schemas/user'
import { ChallengeStatus, CreateChallengeRequest } from '../types'
import { validateIdParam } from '../middlewares/validateId'

const router = express.Router()

// Rutas
router.get('/', getAllChallenges)
router.get('/:id', validateIdParam, getChallengeById)
router.post('/', createChallenge)
router.put('/:id', validateIdParam, updateChallenge)
router.delete('/:id', validateIdParam, deleteChallenge)

// Obtener todos los desafios activos, o por empresa
async function getAllChallenges(
  req: Request<
    Record<string, never>,
    unknown,
    unknown,
    { estado?: ChallengeStatus | ChallengeStatus[]; empresaId?: string }
  >,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { estado, empresaId } = req.query

  try {
    const filter: {
      estado?: { $in: string[] }
      empresaId?: string
    } = {}

    if (estado) {
      const estadosValidos = ['activo', 'inactivo', 'finalizado']

      let estadosArray: string[] = []

      if (Array.isArray(estado)) {
        estadosArray = estado
      } else if (typeof estado === 'string') {
        // axios envía "activo,finalizado"
        estadosArray = estado.split(',')
      }

      // Filtrar solo estados válidos
      estadosArray = estadosArray.filter((e) => estadosValidos.includes(e))

      if (estadosArray.length > 0) {
        filter.estado = { $in: estadosArray }
      }
    }

    if (empresaId) filter.empresaId = empresaId
    console.log('Filtro aplicado:', filter)

    const challenges = await Challenge.find(filter).populate({
      path: 'empresaId',
      select: 'nombreEmpresa',
    })

    res.send(challenges)
  } catch (err) {
    next(err)
  }
}

// Obtener un desafio por ID
async function getChallengeById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Obtener desafio con id: ', req.params.id)

  try {
    const challenge = await Challenge.findById(req.params.id).populate({
      path: 'empresaId',
      select: 'nombreEmpresa',
    })

    if (!challenge) {
      res.status(404).send('Challenge not found')
      return
    }

    res.send(challenge)
  } catch (err) {
    next(err)
  }
}

// Crear un nuevo desafio
async function createChallenge(
  req: Request<Record<string, never>, unknown, CreateChallengeRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Desafio creado: ', req.body)

  const { empresaId } = req.body

  try {
    const empresa = await User.findById(empresaId)
    // Validar si existe la empresa
    if (!empresa) {
      res.status(404).send('Empresa not found')
      return
    }
    // Crear el desafio
    const challengeCreated = await Challenge.create(req.body)

    res.send(challengeCreated)
  } catch (err) {
    next(err)
  }
}

// Actualizar un desafio
async function updateChallenge(
  req: Request<{ id: string }, unknown, Partial<CreateChallengeRequest>>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Actualizar desafio con id: ', req.params.id)

  try {
    const challengeToUpdate = await Challenge.findById(req.params.id)

    if (!challengeToUpdate) {
      console.error('Desafio not found')
      res.status(404).send('Desafio not found')
      return
    }

    // 🔒 Solo el admin o el usuario empresa dueño puede modificarlo
    // if (!req.isAdmin?.() && challengeToUpdate.empresaId.toString() !== req.user?._id.toString()) {
    //   res.status(403).send('No autorizado para modificar este desafío')
    //   return
    // }

    delete req.body.empresaId
    Object.assign(challengeToUpdate, req.body)
    await challengeToUpdate.save()

    res.send(challengeToUpdate)
    console.log('Desafio actualizado: ', req.body)
  } catch (err) {
    next(err)
  }
}

// Eliminar un desafio
async function deleteChallenge(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log('Desafio eliminado con id: ', req.params.id)

  try {
    const challenge = await Challenge.findById(req.params.id)

    if (!challenge) {
      console.error('Desafio not found')
      res.status(404).send('Desafio not found')
      return
    }

    // 🔒 Solo el admin o el usuario empresa dueño puede modificarlo
    // if (!req.isAdmin?.() && challenge.empresaId.toString() !== req.user?._id.toString()) {
    //   res.status(403).send('No autorizado para eliminar este desafío')
    //   return
    // }

    await Challenge.deleteOne({ _id: challenge._id })

    res.send(`Desafio eliminado: ${req.params.id}`)
  } catch (err) {
    next(err)
  }
}

export default router
