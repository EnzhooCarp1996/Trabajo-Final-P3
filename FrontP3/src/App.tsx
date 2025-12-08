import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppContent } from './components/Layout/AppContent'
import { LoginPage } from './components/Login/LoginPage'
import { PrivateRoutes } from './routes/PrivateRoutes'
import { useAuth } from './context/Auth/useAuth'

import './App.css'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/UserProfile" replace /> : <LoginPage />} />

        {/* RUTAS PRIVADAS */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <AppContent>
                <PrivateRoutes />
              </AppContent>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
