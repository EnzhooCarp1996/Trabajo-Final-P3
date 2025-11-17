import { Router, Request, Response, NextFunction } from 'express'
import User from '../schemas/user'
import generateUserToken from '../utils/generate-user-and-token'
import { CreateUserRequest, LoginRequest } from '../types/index'
import Role from '../schemas/role'

const router = Router()

router.post('/', createUserToken)
router.post('/register', createUser)

async function createUserToken(
  req: Request<Record<string, never>, unknown, LoginRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log(`Creating user token for ${req.body.email}`)

  if (!req.body.email) {
    console.error('Missing email parameter. Sending 400 to client')
    res.status(400).json({ message: 'Falta el campo email.' })
    return
  }

  if (!req.body.password) {
    console.error('Missing password parameter. Sending 400 to client')
    res.status(400).json({ message: 'Falta el campo password.' })
    return
  }

  try {
    const user = await User.findOne({ email: req.body.email }, '+password')

    if (!user) {
      console.error('User not found. Sending 404 to client')
      res.status(401).json({ message: 'Usuario no encontrado.' })
      return
    }

    console.log('Checking user password')
    const result = await user.checkPassword(req.body.password)

    if (result.isLocked) {
      console.error('User is locked. Sending 400 (Locked) to client')
      res.status(403).json({ message: 'El usuario está bloqueado.' })
      return
    }

    if (!result.isOk) {
      console.error('User password is invalid. Sending 401 to client')
      res.status(401).json({ message: 'Contraseña incorrecta.' })
      return
    }

    const response = await generateUserToken(req, user)

    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

async function createUser(
  req: Request<Record<string, never>, unknown, CreateUserRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = req.body
  
  try {
    const role = await Role.findOne({ nombre: user.role })
    if (!role) {
      console.error('Rol not found')
      res.status(404).send('Rol not found')
      return
    }

    const userCreated = await User.create({
      ...user,
      role: role._id,
    })

    res.send(userCreated)
    console.log('Usuario creado: ', req.body)
  } catch (err) {
    next(err)
  }
}

export default router
