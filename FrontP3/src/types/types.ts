export type ChallengeStatus = "activo" | "inactivo";

export type ProposalStatus = "en revision" | "seleccionada" | "descartada";

export type Role = "empresa" | "emprendedor";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  activo: boolean;
  telefono: string;
  createdAt?: Date;
  nombreEmpresa?: string;
  descripcion?: string;
  sitioWeb?: string;
  nombreCompleto?: string;
  edad?: number;
}

export interface IChallenge {
  _id: string;
  empresaId: string;
  titulo: string;
  descripcion: string;
  estado: ChallengeStatus;
  createdAt: Date;
}

export interface IProposal {
  _id: string;
  desafioId: string;
  emprendedorId: string;
  tituloPropuesta: string;
  descripcion: string;
  estado: ProposalStatus;
  puntos: number;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  nombreUsuario: string;
  email: string;
  role: string;
  refreshToken?: string;
  mensaje?: string;
}

export interface JwtPayload {
  exp: number;
  sub: string;
  nombreUsuario?: string;
  email?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  nombreUsuario: string;
  role: string;
  refreshToken?: string;
  mensaje?: string;
}