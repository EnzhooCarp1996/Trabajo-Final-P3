import jwt from 'jsonwebtoken'
// import fs from 'fs'
// import path from 'path'

import Role from '../schemas/role'
import { IUser, JWTPayload } from '../types/index'

interface UserResponse {
  _id: string
  role: string
  email: string
  nombre: string
}

interface TokenResponse {
  token: string
  user: UserResponse
}

async function generateUserToken(req: unknown, user: IUser): Promise<TokenResponse> {
  const role = await Role.findById(user.role).exec()

  if (!role) {
    throw new Error('Role not found')
  }

  const nombre = user.nombreCompleto ?? user.nombreEmpresa ?? 'Usuario'

  const payload: JWTPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: role.nombre,
    nombre,
  }

  const userResponse: UserResponse = {
    _id: user._id.toString(),
    role: role.nombre,
    email: user.email,
    nombre,
  }

  // const privateKey = fs.readFileSync(path.join(__dirname, `../keys/base-api-express-generator.pem`))
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error('JWT_SECRET no está definido')
  }

  // Unsecure alternative
  const token = jwt.sign(payload, jwtSecret, {
    subject: user._id.toString(),
    issuer: process.env.JWT_ISSUER || 'base-api-express-generator',
    algorithm: 'HS256',
    expiresIn: '2h', // duración del token
  })

  // const token = jwt.sign(payload, privateKey, {
  //   subject: user._id.toString(),
  //   issuer: 'base-api-express-generator',
  //   algorithm: 'RS256',
  // })

  return { token, user: userResponse }
}

export default generateUserToken
