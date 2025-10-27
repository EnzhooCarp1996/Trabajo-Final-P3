import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContent } from './components/Layout/AppContent';
import './App.css'
import { useEffect } from 'react';
import { storage } from './storage';
import { CompaniesView } from './components/Company/CompaniesView';
import { ChallengesView } from './components/Challenge/ChallengesView';
import { EntrepreneursView } from './components/Entrepreneur/EntrepeneursView';
import { ProposalsView } from './components/Proposal/ProposalsView';

function App() {
  useEffect(() => {
    storage.initializeSampleData();
  }, []);
  return (
    <BrowserRouter>
      <AppContent>
        <Routes>
          <Route path="/Company" element={<CompaniesView />} />
          <Route path="/Challenge" element={<ChallengesView/>} />
          <Route path="/Entrepreneur" element={<EntrepreneursView/>} />
          <Route path="/Proposal" element={<ProposalsView/>} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </AppContent>
    </BrowserRouter>
  );
}

export default App
