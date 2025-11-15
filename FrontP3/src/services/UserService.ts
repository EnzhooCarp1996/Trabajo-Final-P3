import type { IUser } from "../types/types";
import axiosInstance from "./AxiosService";

export type Role = "empresa" | "emprendedor";


export interface CreateUserRequest {
  email: string;
  password: string;
  role: string;
  activo: boolean;
  telefono: string;
  nombreEmpresa?: string;
  descripcion?: string;
  sitioWeb?: string;
  nombreCompleto?: string;
  edad?: number;
}

// Interfaz que define el contrato del servicio
export interface UserService {
  getAllByRole: (role: "empresa" | "emprendedor") => Promise<IUser[]>;
  getById: (id: string) => Promise<IUser>;
  create: (data: CreateUserRequest) => Promise<IUser>;
  update: (id: string, data: Partial<CreateUserRequest>) => Promise<IUser>;
  delete: (id: string) => Promise<{ message: string }>;
}

// Implementación del servicio
export const userService: UserService = {
  getAllByRole: (role) =>
    axiosInstance.get<IUser[]>(`/users`, { params: { role } }).then(res => res.data),

  getById: (id) =>
    axiosInstance.get<IUser>(`/users/${id}`).then(res => res.data),

  create: (data) =>
    axiosInstance.post<IUser>(`/users`, data).then(res => res.data),

  update: (id, data) =>
    axiosInstance.put<IUser>(`/users/${id}`, data).then(res => res.data),

  delete: (id) =>
    axiosInstance.delete<{ message: string }>(`/users/${id}`).then(res => res.data),
};
