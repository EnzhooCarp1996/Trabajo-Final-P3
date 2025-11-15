import type { IProposal, ProposalStatus } from "../types/types";
import axiosInstance from "./AxiosService";

export interface ProposalFilters {
  estado?: ProposalStatus;
  desafioId?: string;
  emprendedorId?: string;
}

export interface CreateProposalRequest {
  desafioId: string
  emprendedorId: string
  tituloPropuesta: string
  descripcion: string
  estado: ProposalStatus
  puntos: number
}

// Interfaz que define el contrato del servicio
export interface ProposalService {
  getAll: (filters?: ProposalFilters) => Promise<IProposal[]>;
  getById: (id: string) => Promise<IProposal>;
  create: (data: CreateProposalRequest) => Promise<IProposal>;
  update: (id: string, data: Partial<CreateProposalRequest>) => Promise<IProposal>;
  delete: (id: string) => Promise<{ message: string }>;
}

// Implementación del servicio
export const proposalService: ProposalService = {
  getAll: (filters) =>
    axiosInstance.get<IProposal[]>(`/proposals`, { params: filters }).then(res => res.data),

  getById: (id) =>
    axiosInstance.get<IProposal>(`/proposals/${id}`).then(res => res.data),

  create: (data) =>
    axiosInstance.post<IProposal>(`/proposals`, data).then(res => res.data),

  update: (id, data) =>
    axiosInstance.put<IProposal>(`/proposals/${id}`, data).then(res => res.data),

  delete: (id) =>
    axiosInstance.delete<{ message: string }>(`/proposals/${id}`).then(res => res.data),
};
