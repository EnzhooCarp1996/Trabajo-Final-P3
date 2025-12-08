import { Document, Types } from 'mongoose'

export type ChallengeStatus = 'activo' | 'inactivo' | 'finalizado'

export type ProposalStatus = 'en revision' | 'seleccionada' | 'descartada'

export type UserType = 'empresa' | 'emprendedor'

export interface IUser extends Document {
  _id: Types.ObjectId
  email: string
  password: string
  role: Types.ObjectId | IRole
  nombreEmpresa?: string
  descripcion?: string
  sitioWeb?: string
  telefono: string
  nombreCompleto?: string
  edad?: number
  activo: boolean
  createdAt: Date
  challengeCount?: number
  proposalCount?: number
  checkPassword(potentialPassword: string): Promise<{ isOk: boolean; isLocked: boolean }>
}

export interface IRole extends Document {
  _id: Types.ObjectId
  nombre: UserType
  activo: boolean
}

export interface IChallenge extends Document {
  _id: Types.ObjectId
  empresaId: Types.ObjectId
  titulo: string
  descripcion: string
  estado: ChallengeStatus
  createdAt: Date
}

export interface IProposal extends Document {
  _id: Types.ObjectId
  desafioId: Types.ObjectId
  emprendedorId: Types.ObjectId
  tituloPropuesta: string
  descripcion: string
  estado: ProposalStatus
  puntos: number
  createdAt: Date
}

export interface IVote extends Document {
  _id: Types.ObjectId
  propuestaId: Types.ObjectId
  empresaId: Types.ObjectId
  valor: number
  createdAt: Date
}

export interface INotification extends Document {
  _id: Types.ObjectId
  toUserId: Types.ObjectId
  fromUserId: Types.ObjectId
  contenido: string
  visto: boolean
  createdAt: Date
}

// JWT Payload
export interface JWTPayload {
  _id: string
  email: string
  role: string
  nombre: string
  iat?: number
  exp?: number
  iss?: string
}

// Request Extensions - using module augmentation instead of namespace
declare module 'express-serve-static-core' {
  interface Request {
    user?: JWTPayload
    isAdmin?(): boolean
    isClient?(): boolean
  }
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Auth Request Types
export interface LoginRequest {
  email: string
  password: string
}

export interface CreateUserRequest {
  email: string
  password: string
  role: Types.ObjectId
  activo: boolean
  telefono: string
  nombreEmpresa?: string
  descripcion?: string
  sitioWeb?: string
  nombreCompleto?: string
  edad?: number
}

export interface CreateChallengeRequest {
  empresaId: Types.ObjectId
  titulo: string
  descripcion: string
  estado?: ChallengeStatus
}

export interface CreateProposalRequest {
  desafioId: Types.ObjectId
  emprendedorId: Types.ObjectId
  tituloPropuesta: string
  descripcion: string
  estado: ProposalStatus
  puntos: number
}

export interface CreateNotificationRequest {
  toUserId: Types.ObjectId
  fromUserId: Types.ObjectId
  contenido: string
  createdAt: Date
}

export interface CreateVoteRequest extends Document {
  propuestaId: Types.ObjectId
  empresaId: Types.ObjectId
  valor: number
  createdAt: Date
}

// Environment Variables
export interface EnvironmentVariables {
  NODE_ENV?: string
  PORT?: string
  MONGO_URL?: string
  MONGO_DB?: string
  JWT_SECRET?: string
  JWT_ISSUER?: string
}
