import { getToken, isTokenExpired } from "./SessionService";
import type { IUser, LoginResponse } from "../types/types";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./AxiosService";
import type { CreateUserRequest } from "./UserService";

export interface JWTPayload {
  _id: string;
  email: string;
  nombre: string;
  role: "empresa" | "emprendedor";
  iat?: number;
  exp?: number;
  iss?: string;
}

// -------------------------
// LOGIN
// -------------------------
export interface AuthService {
  logIn: (email: string, password: string) => Promise<LoginResponse>;
  create: (data: CreateUserRequest) => Promise<IUser>;
  getUserInfo: () => { _id: string, email: string, nombre: string, role: string };
}

export const authService: AuthService = {
  logIn: (email, password) =>
    axiosInstance.post<LoginResponse>("/auth", { email, password })
      .then((res) => {
        if (!res.data.token) throw new Error("Token no recibido");
        return res.data;
      })
      .catch((err) => {
      // Captura mensaje legible desde backend
      const msg = err.response?.data?.message || "Credenciales inválidas";
      throw new Error(msg);
    }),

  create: (data) =>
    axiosInstance.post<IUser>(`/auth/register`, data).then(res => res.data),

  // -------------------------
  // USUARIO ACTUAL
  // -------------------------

  getUserInfo: () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) return {  _id: "", email: "", nombre: "", role: "" };
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      
      return { _id: decoded._id, email: decoded.email, nombre: decoded.nombre, role: decoded.role };
    } catch {
      return {  _id: "", email: "", nombre: "", role: "" };
    }
  },
};
