export type ChallengeStatus = "activo" | "inactivo";

export type ProposalStatus = "en revision" | "seleccionada" | "descartada";

export type UserType = "empresa" | "emprendedor";

export interface User {
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

export interface Challenge {
  id: string;
  empresaId: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
  estado: ChallengeStatus;
}

export interface Proposal {
  id: string;
  desafioId: string;
  emprendedorId: string;
  tituloPropuesta: string;
  descripcion: string;
  fechaCreacion: string;
  estado: ProposalStatus;
  puntos: number;
}
