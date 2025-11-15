import type { IUser } from './types/types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppContent } from './components/Layout/AppContent';
import { storage } from './storage';
import { useEffect } from 'react';


import './App.css'
import { useAuth } from './context/Auth/useAuth';
import { LoginForm } from './components/Login/LoginForm';
import { PrivateRoutes } from './routes/PrivateRoutes';
// import { LoginForm } from './components/Login/LoginForm';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token, role, email, _id } = useAuth();
  console.log("TOKEN EN APP:", token);

  useEffect(() => {
    storage.initializeSampleData();
  }, []);



  const user: IUser = {
    _id: _id,
    email: email,
    password: "********",
    role: role,
    activo: true,
    telefono: "1168779720",
    createdAt: "2023-01-01",
    nombreCompleto: "Maria Gonzalez",
    edad: 18,
  };

  // const user: User = {
  //   id: "2",
  //   email: "empresa@example.com",
  //   password: "********",
  //   tipoUsuario: "empresa",       // <- tipo empresa
  //   fechaRegistro: "2023-02-15",
  //   activo: true,
  //   nombreEmpresa: "Tech Solutions S.A.",
  //   descripcion: "Empresa dedicada al desarrollo de software y consultoría tecnológica.",
  //   sitioWeb: "https://www.techsolutions.com",
  //   telefono: "+54 11 1234-5678",
  // };

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  // };

  return (

    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={token ? <Navigate to="/UserProfile" /> : <LoginForm />}
        />

        {/* RUTAS PRIVADAS */}
        <Route
          path="/*"
          element={
            token ? (
              <AppContent nombreUsuario={user.nombreCompleto}>
                <PrivateRoutes user={user} />
              </AppContent>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App
