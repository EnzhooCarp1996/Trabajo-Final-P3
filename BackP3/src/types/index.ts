import { Document, Types } from 'mongoose'

export type ChallengeStatus = "activo" | "inactivo";

export type ProposalStatus = "en revision" | "seleccionada" | "descartada";

export type UserType = "empresa" | "emprendedor";

export interface User extends Document {
  id: string;
  email: string;
  password: string;
  role: UserType;
  fechaRegistro: string;
  activo: boolean;
  nombreEmpresa?: string;
  descripcion?: string;
  sitioWeb?: string;
  telefono?: string;
  nombreCompleto?: string;
  edad?: number;
}

export interface Challenge extends Document {
  id: string;
  empresaId: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
  estado: ChallengeStatus;
}

export interface Proposal extends Document {
  id: string;
  desafioId: string;
  emprendedorId: string;
  tituloPropuesta: string;
  descripcion: string;
  fechaCreacion: string;
  estado: ProposalStatus;
  puntos: number;
}

// JWT Payload
export interface JWTPayload {
  _id: string
  email: string
  role: string
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
  role: string
  firstName: string
  lastName: string
  phone?: string
  governmentId?: string
  bornDate?: Date
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
