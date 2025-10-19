import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContent } from './components/Layout/AppContent';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppContent>
        <Routes>
          {/* <Route path="/Company" element={} />
          <Route path="/Challenge" element={} />
          <Route path="/Entrepeneur" element={} />
          <Route path="/Proposal" element={} />
          <Route path="*" element={<h2>Página no encontrada</h2>} /> */}
        </Routes>
      </AppContent>
    </BrowserRouter>
  );
}

export default App
