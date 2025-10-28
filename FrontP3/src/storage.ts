import type { Company, Entrepreneur, Challenge, Proposal } from "./types/types";

const STORAGE_KEYS = {
  COMPANIES: "companies",
  ENTREPRENEURS: "entrepreneurs",
  CHALLENGES: "challenges",
  PROPOSALS: "proposals",
};

export const storage = {
  getCompanies: (): Company[] => {
    const data = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return data ? JSON.parse(data) : [];
  },

  setCompanies: (companies: Company[]): void => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  },

  getEntrepreneurs: (): Entrepreneur[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ENTREPRENEURS);
    return data ? JSON.parse(data) : [];
  },

  setEntrepreneurs: (entrepreneurs: Entrepreneur[]): void => {
    localStorage.setItem(
      STORAGE_KEYS.ENTREPRENEURS,
      JSON.stringify(entrepreneurs)
    );
  },

  getChallenges: (): Challenge[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    return data ? JSON.parse(data) : [];
  },

  setChallenges: (challenges: Challenge[]): void => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  },

  getProposals: (): Proposal[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
    return data ? JSON.parse(data) : [];
  },

  setProposals: (proposals: Proposal[]): void => {
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  },

  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  initializeSampleData: (): void => {
    if (storage.getCompanies().length === 0) {
      const sampleCompanies: Company[] = [
        {
          id: "1",
          usuarioId: "1",
          nombreEmpresa: "TechCorp Solutions",
          descripcion: "Empresa líder en soluciones tecnológicas",
          sitioWeb: "https://techcorp.example.com",
          telefono: "+1234567890",
        },
        {
          id: "2",
          usuarioId: "2",
          nombreEmpresa: "Innovation Labs",
          descripcion: "Laboratorio de innovación y desarrollo",
          sitioWeb: "https://innovationlabs.example.com",
          telefono: "+0987654321",
        },
        {
          id: "3",
          usuarioId: "3",
          nombreEmpresa: "Innovation Labs",
          descripcion: "Laboratorio de innovación y desarrollo",
          sitioWeb: "https://innovationlabs.example.com",
          telefono: "+0987654321",
        },
      ];
      storage.setCompanies(sampleCompanies);
    }

    if (storage.getEntrepreneurs().length === 0) {
      const sampleEntrepreneurs: Entrepreneur[] = [
        {
          id: "1",
          usuarioId: "3",
          nombreCompleto: "María González",
        },
        {
          id: "2",
          usuarioId: "4",
          nombreCompleto: "Carlos Rodríguez",
        },
      ];
      storage.setEntrepreneurs(sampleEntrepreneurs);
    }

    if (storage.getChallenges().length === 0) {
      const sampleChallenges: Challenge[] = [
        {
          id: "1",
          empresaId: "1",
          titulo: "Desarrollo de App Móvil",
          descripcion:
            "Buscamos una solución innovadora para nuestra app móvil de gestión empresarial",
          fechaPublicacion: new Date().toISOString(),
          estado: "activo",
        },
        {
          id: "2",
          empresaId: "2",
          titulo: "Sistema de IA para Análisis",
          descripcion:
            "Necesitamos implementar un sistema de inteligencia artificial para análisis de datos",
          fechaPublicacion: new Date().toISOString(),
          estado: "activo",
        },
        {
          id: "3",
          empresaId: "1",
          titulo: "Sistema de IA para Análisis",
          descripcion:
            "Necesitamos implementar un sistema de inteligencia artificial para análisis de datos",
          fechaPublicacion: new Date().toISOString(),
          estado: "activo",
        },
      ];
      storage.setChallenges(sampleChallenges);
    }

    if (storage.getProposals().length === 0) {
      const sampleProposals: Proposal[] = [
        {
          id: "1",
          desafioId: "1",
          emprendedorId: "1",
          tituloPropuesta: "App Móvil con React Native",
          descripcion:
            "Propongo desarrollar la aplicación usando React Native para máxima compatibilidad",
          fechaCreacion: new Date().toISOString(),
          estado: "en revisión",
          puntos: 85,
        },
        {
          id: "2",
          desafioId: "2",
          emprendedorId: "2",
          tituloPropuesta: "Sistema de ML con Python",
          descripcion:
            "Implementación de machine learning usando Python y TensorFlow",
          fechaCreacion: new Date().toISOString(),
          estado: "seleccionada",
          puntos: 92,
        },
      ];
      storage.setProposals(sampleProposals);
    }
  },
};
