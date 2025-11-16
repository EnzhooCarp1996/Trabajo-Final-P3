import { getToken, logout as sessionLogout } from "../../services/SessionService";
import { authService } from "../../services/AuthService";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken());
  const [userInfo, setUserInfo] = useState(authService.getUserInfo());

  const login = ( newToken: string, recordar: boolean = true ) => {
    if (recordar) {
      localStorage.setItem("token", newToken);
    } else {
      sessionStorage.setItem("token", newToken);
    }

    setToken(newToken);
    setUserInfo(authService.getUserInfo());
  };


  const logout = () => {
    sessionLogout();
    setToken(null);
    setUserInfo({ _id: "", email: "", nombre: "", role: "" });
  };

  useEffect(() => {
    // Sincronización entre pestañas
    const handleStorage = () => {
      const t = getToken();
      setToken(t);
      setUserInfo(authService.getUserInfo());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        _id: userInfo._id,
        email: userInfo.email,
        nombre: userInfo.nombre,
        role: userInfo.role,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
