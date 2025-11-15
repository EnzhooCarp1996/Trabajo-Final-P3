import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  _id: string;
  email: string;
  nombre: string;
  role: string;
  login: (token: string, recordar?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
