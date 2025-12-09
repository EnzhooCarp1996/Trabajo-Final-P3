import type { JWTPayload } from '../types/types'
import { jwtDecode } from 'jwt-decode'

export function getToken(): string | null {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  sessionStorage.removeItem('token')
}

export function logout(setToken?: (token: string | null) => void) {
  clearSession()
  if (setToken) setToken(null)
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token)
    if (!decoded.exp) return true
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
