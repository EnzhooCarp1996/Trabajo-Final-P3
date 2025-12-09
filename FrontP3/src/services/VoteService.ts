import type { CreateVoteRequest, IVote } from '../types/types'
import axiosInstance from './AxiosService'


// Interfaz que define el contrato del servicio
export interface VoteService {
  getVotosDePropuesta: (propuestaId: string) => Promise<IVote[]>
  getVoteProposalByCompany: (propuestaId: string) => Promise<CreateVoteRequest>
  votarPropuesta: (propuestaId: string, data: CreateVoteRequest) => Promise<IVote>
}

// Implementación del servicio
export const voteService: VoteService = {
  getVotosDePropuesta: (propuestaId) => axiosInstance.get<IVote[]>(`/votes/${propuestaId}`).then((res) => res.data),

  getVoteProposalByCompany: (propuestaId) =>
    axiosInstance.get<CreateVoteRequest>(`/votes/${propuestaId}/my-vote`).then((res) => res.data),

  votarPropuesta: (propuestaId, data) =>
    axiosInstance.post<IVote>(`/votes/${propuestaId}`, data).then((res) => res.data),
}
