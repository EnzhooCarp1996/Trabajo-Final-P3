import { EntrepreneurView } from './components/Entrepreneur/EntrepreneurView';
import { ChallengesView } from './components/Challenge/ChallengesView';
import { ProposalsView } from './components/Proposal/ProposalsView';
import { CompanyView } from './components/Company/CompanyView';
import { UserProfile } from './components/UserProfile/UserProfile';
import type { IUser } from './types/types';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContent } from './components/Layout/AppContent';
import { storage } from './storage';
import { useEffect } from 'react';


import './App.css'
// import { LoginForm } from './components/Login/LoginForm';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user: IUser = {
    _id: "3",
    email: "maria.gonzalez@example.com",
    password: "********",
    role: "emprendedor",
    createdAt: "2023-01-01",
    activo: true,
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



  useEffect(() => {
    storage.initializeSampleData();
  }, []);

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        {/* <Route path="/login" element={<LoginForm onLogin={handleLogin} />} /> */}

        {/* Rutas privadas: requieren estar autenticado */}
        <Route
          path="/*"
          element={
            <AppContent nombreUsuario={user.role === "emprendedor" ? user.nombreCompleto : user.nombreEmpresa}>
              <Routes>
                <Route path="/UserProfile" element={<UserProfile user={user} />} />
                <Route path="/Company" element={<CompanyView />} />
                <Route path="/Challenge" element={<ChallengesView readOnly showButtonNew={user.role === "emprendedor"} />} />
                <Route path="/Challenge/:empresaId" element={<ChallengesView />} />
                <Route path="/Entrepreneur" element={<EntrepreneurView />} />
                <Route path="/Proposal" element={<ProposalsView titulo={"Propuestas"} readOnly showButtonNew={user.role === "emprendedor"} />} />
                <Route path="/Proposal/:entrepreneurId" element={<ProposalsView titulo={"Mis Propuestas"} showButtonNew={user.role === "emprendedor"} />} />
                <Route path="*" element={<h2>Página no encontrada</h2>} />
              </Routes>
            </AppContent>

            // <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
