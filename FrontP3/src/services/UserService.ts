import api from "./AxiosService"; // tu axiosInstance con interceptores
import type { AxiosResponse } from "axios";

// Tipos de usuario (podés ajustarlos según tu schema)

export type Role = "empresa" | "emprendedor";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Role;
  telefono: string;
  createdAt?: string;
  nombreEmpresa?: string;
  descripcion?: string;
  sitioWeb?: string;
  nombreCompleto?: string;
  edad?: number;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: string; // en el frontend, generalmente se manda como string, no ObjectId
  activo: boolean;
  telefono: string;
  nombreEmpresa?: string;
  descripcion?: string;
  sitioWeb?: string;
  nombreCompleto?: string;
  edad?: number;
}

// Obtener todos los usuarios filtrados por rol
export async function getAllUsersByRole(role: "empresa" | "emprendedor"): Promise<IUser[]> {
  const response: AxiosResponse<IUser[]> = await api.get(`/users`, {
    params: { role },
  });
  return response.data;
}

// Obtener usuario por ID
export async function getUserById(id: string): Promise<IUser> {
  const response: AxiosResponse<IUser> = await api.get(`/users/${id}`);
  return response.data;
}

// Crear usuario
export async function createUser(data: CreateUserRequest): Promise<IUser> {
  const response: AxiosResponse<IUser> = await api.post(`/users`, data);
  return response.data;
}

// Actualizar usuario
export async function updateUser(id: string, data: Partial<CreateUserRequest>): Promise<IUser> {
  const response: AxiosResponse<IUser> = await api.put(`/users/${id}`, data);
  return response.data;
}

// Eliminar usuario
export async function deleteUser(id: string): Promise<string> {
  const response: AxiosResponse<string> = await api.delete(`/users/${id}`);
  return response.data;
}
