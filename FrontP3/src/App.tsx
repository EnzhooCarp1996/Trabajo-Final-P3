import { EntrepreneursView } from './components/Entrepreneur/EntrepreneursView';
import { ChallengesView } from './components/Challenge/ChallengesView';
import { ProposalsView } from './components/Proposal/ProposalsView';
import { CompaniesView } from './components/Company/CompaniesView';
import { UserProfile } from './components/UserProfile/UserProfile';
import type { Company, Entrepreneur, User } from './types/types';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContent } from './components/Layout/AppContent';
import { storage } from './storage';
import { useEffect } from 'react';

import './App.css'

function App() {

  const user: User = {
    id: "1",
    email: "maria.gonzalez@example.com",
    password: "********",
    tipoUsuario: "emprendedor",
    fechaRegistro: "2023-01-01",
    activo: true,
  };
  const entrepreneur: Entrepreneur = {
    id: "1",
    nombreCompleto: "Maria Gonzalez",
    edad: 18,
    usuarioId: "1",
  };
  const company: Company = {
    id: "1",
    usuarioId: "1",
    nombreEmpresa: "Tech Innovations",
    descripcion: "Empresa dedicada a la creación de soluciones tecnológicas innovadoras.",
    sitioWeb: "https://tech-innovations.com",
    telefono: "+123456789",
  };
  useEffect(() => {
    storage.initializeSampleData();
  }, []);
  return (
    <BrowserRouter>
      <AppContent>
        <Routes>
          <Route path="/UserProfile" element={<UserProfile user={user} entrepreneur={entrepreneur} company={company} />} />
          <Route path="/Company" element={<CompaniesView />} />
          <Route path="/Challenge/:empresaId" element={<ChallengesView />} />
          <Route path="/Challenge" element={<ChallengesView readOnly showButtonNew={user.tipoUsuario === "emprendedor"} />} />
          <Route path="/Entrepreneur" element={<EntrepreneursView />} />
          <Route path="/Proposal" element={<ProposalsView />} />
          <Route path="/Proposal/:empresaId" element={<ProposalsView />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </AppContent>
    </BrowserRouter>
  );
}

export default App
