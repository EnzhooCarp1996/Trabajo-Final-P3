export type UserType = 'empresa' | 'emprendedor';

export type ChallengeStatus = 'activo' | 'inactivo';

export type ProposalStatus = 'en revisión' | 'seleccionada' | 'descartada';

export interface User {
  id: string;
  email: string;
  password: string;
  tipoUsuario: UserType;
  nombre: string;
  fechaRegistro: string;
  activo: boolean;
}

export interface Company {
  id: string;
  usuarioId: string;
  nombreEmpresa: string;
  descripcion: string;
  sitioWeb: string;
  telefono: string;
}

export interface Entrepreneur {
  id: string;
  usuarioId: string;
  nombreCompleto: string;
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
