export type ChallengeStatus = 'activo' | 'inactivo' | 'finalizado'

export type ProposalStatus = 'en revision' | 'seleccionada' | 'descartada'

export interface Role {
  _id: string
  nombre: 'empresa' | 'emprendedor'
}

// ==================================
//  Users
// ==================================
export interface CurrentUser {
  _id: string
  email: string
  nombre: string
  role: 'empresa' | 'emprendedor' | ''
}

export interface IUser {
  _id: string
  email: string
  password: string
  role: Role
  activo: boolean
  telefono: string
  createdAt?: Date
  descripcion: string
  nombreEmpresa?: string
  sitioWeb?: string
  nombreCompleto?: string
  edad?: number
  challengeCount?: number
  proposalCount?: number
}

export interface CreateUserRequest {
  email: string
  password?: string
  role: string
  activo: boolean
  telefono: string
  descripcion: string
  nombreEmpresa?: string
  sitioWeb?: string
  nombreCompleto?: string
  edad?: number
}

export interface ICompanyRef {
  _id: string
  nombreEmpresa: string
}

export interface IEntrepreneurRef {
  _id: string
  nombreCompleto: string
}

interface Empresa {
  nombreEmpresa: string
}

interface Emprendedor {
  nombreCompleto: string
}

export type Sender = Empresa | Emprendedor | null | undefined

// ==================================
//  Notifications
// ==================================
export interface INotification {
  _id: string
  fromUserId: IEntrepreneurRef | ICompanyRef // remitente
  toUserId: string // destinatario
  contenido: string
  visto: boolean
  createdAt: Date
}

export interface NotificationFilters {
  toUserId?: string // notificaciones recibidas
  fromUserId?: string // notificaciones enviadas
  visto?: boolean
}

export interface CreateNotificationRequest {
  fromUserId: string
  toUserId: string
  contenido: string
  createdAt: Date
  visto: boolean
}

// ==================================
//  Challenges
// ==================================
export interface IChallenge {
  _id: string
  empresaId: ICompanyRef
  titulo: string
  descripcion: string
  estado: ChallengeStatus
  createdAt: Date
}

export interface IChallengeRef {
  _id: string
  titulo: string
}

export interface ChallengeFilters {
  estado?: ChallengeStatus[]
  empresaId?: string
}

export interface CreateChallengeRequest {
  empresaId: string
  titulo: string
  descripcion: string
  estado?: ChallengeStatus
}

// ==================================
//  Proposals
// ==================================
export interface IProposal {
  _id: string
  desafioId: IChallengeRef
  emprendedorId: IEntrepreneurRef
  tituloPropuesta: string
  descripcion: string
  estado: ProposalStatus
  puntos: number
  createdAt: string
}

export interface ProposalFilters {
  estado?: ProposalStatus
  desafioId?: string
  emprendedorId?: string
}

export interface CreateProposalRequest {
  desafioId: string
  emprendedorId: string
  tituloPropuesta: string
  descripcion: string
  estado: ProposalStatus
  puntos: number
}

//=====================================================
export interface JWTPayload {
  _id: string
  email: string
  nombre: string
  role: 'empresa' | 'emprendedor'
  iat?: number
  exp?: number
  iss?: string
}

export interface LoginResponse {
  token: string
  nombreUsuario: string
  email: string
  role: string
  refreshToken?: string
  mensaje?: string
}

export interface LoginResponse {
  token: string
  nombreUsuario: string
  role: string
  refreshToken?: string
  mensaje?: string
}