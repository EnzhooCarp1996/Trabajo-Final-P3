import type { IChallenge } from "../types/types";
import axiosInstance from "./AxiosService";

export type ChallengeStatus = "activo" | "inactivo";

export interface CreateChallengeRequest {
  empresaId: string;
  titulo: string;
  descripcion: string;
  estado?: ChallengeStatus
}

// Interfaz que define el contrato del servicio
export interface ChalengeService {
  getAll: (estado: ChallengeStatus) => Promise<IChallenge[]>;
  getById: (id: string) => Promise<IChallenge>;
  create: (data: CreateChallengeRequest) => Promise<IChallenge>;
  update: (id: string, data: Partial<CreateChallengeRequest>) => Promise<IChallenge>;
  delete: (id: string) => Promise<{ message: string }>;
}

// Implementación del servicio
export const challengeService: ChalengeService = {
  getAll: (estado) =>
    axiosInstance.get<IChallenge[]>(`/challenges`, { params: { estado } }).then(res => res.data),

  getById: (id) =>
    axiosInstance.get<IChallenge>(`/challenges/${id}`).then(res => res.data),

  create: (data) =>
    axiosInstance.post<IChallenge>(`/challenges`, data).then(res => res.data),

  update: (id, data) =>
    axiosInstance.put<IChallenge>(`/challenges/${id}`, data).then(res => res.data),

  delete: (id) =>
    axiosInstance.delete<{ message: string }>(`/challenges/${id}`).then(res => res.data),
};
