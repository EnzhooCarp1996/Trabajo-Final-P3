import { getToken, logout as sessionLogout } from "../../services/SessionService";
import { createSocket, disconnectSocket } from "../../services/SocketService";
import { authService } from "../../services/AuthService";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import type { INotification } from "../../types/types";
import { notificationService } from "../../services/NotificationService";
import type { Socket } from "socket.io-client";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken());
  const [userInfo, setUserInfo] = useState(authService.getUserInfo());
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);



  const login = (newToken: string, recordar: boolean = true) => {
    if (recordar) {
      localStorage.setItem("token", newToken);
      console.log("TOKEN GUARDADO:", newToken);

    } else {
      sessionStorage.setItem("token", newToken);
    }

    setToken(newToken);
    setUserInfo(authService.getUserInfo());
  };


  const logout = () => {
    if (socket) disconnectSocket(socket);
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

  useEffect(() => {
    if (!userInfo._id) return;

    // setLoading(true);
    notificationService
      .getAll({ toUserId: userInfo._id })
      .then((res) => setNotifications(res))
    // .finally(() => setLoading(false));

  }, [userInfo._id]);

  useEffect(() => {
    if (!token || !userInfo._id || socket) return;
    console.log("🔌 Conectando socket para user:", userInfo._id);

    const s = createSocket(userInfo._id);
    setSocket(s);

    // cuando llega una notificación
    s.on("notification:new", (data) => {
      console.log("🎯 SOCKET EVENTO LLEGÓ AL PROVIDER:", data);
      setNotifications((prev) => {
        const updated = [data, ...prev];
        console.log("📌 Nuevo array de notificaciones:", updated);
        return updated;
      });
    });

    return () => {
      s.disconnect();
    };
  }, [token, userInfo._id]);

  const handleMarkAsSeen = (id: string) => {
    notificationService.markAsSeen(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, visto: true } : n))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        _id: userInfo._id,
        email: userInfo.email,
        nombre: userInfo.nombre,
        role: userInfo.role,
        notifications,
        handleMarkAsSeen,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
