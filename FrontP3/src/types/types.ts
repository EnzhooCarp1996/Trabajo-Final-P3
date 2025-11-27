export type ChallengeStatus = "activo" | "inactivo" | "finalizado";

export type ProposalStatus = "en revision" | "seleccionada" | "descartada";

export interface Role {
  _id: string;
  nombre: "empresa" | "emprendedor";
} 

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Role;
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
  empresaId: ICompanyRef;
  titulo: string;
  descripcion: string;
  estado: ChallengeStatus;
  createdAt: Date;
}

export interface ICompanyRef {
  _id: string;
  nombreEmpresa: string;
}

export interface IProposal {
  _id: string;
  desafioId: IChallengeRef;
  emprendedorId: IEntrepreneurRef;
  tituloPropuesta: string;
  descripcion: string;
  estado: ProposalStatus;
  puntos: number;
  createdAt: string;
}

export interface IChallengeRef {
  _id: string;
  titulo: string;
}

export interface IEntrepreneurRef {
  _id: string;
  nombreCompleto: string;
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