import type { IUser, Challenge, Proposal } from "./types/types";

const STORAGE_KEYS = {
  USERS: "users",
  CHALLENGES: "challenges",
  PROPOSALS: "proposals",
};

export const storage = {
  getUsers: (): IUser[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  setUsers: (users: IUser[]): void => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  updateUser: (updated: IUser) => {
    const list = storage
      .getUsers()
      .map((u) => (u._id === updated._id ? updated : u));
    storage.setUsers(list);
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
    const sampleUsers: IUser[] = [
      // Empresas
      {
        _id: "1",
        email: "empresa1@example.com",
        password: "********",
        role: "empresa",
        createdAt: "2023-01-01",
        nombreEmpresa: "TechCorp Solutions",
        descripcion: "Empresa líder en soluciones tecnológicas",
        sitioWeb: "https://techcorp.example.com",
        telefono: "+1234567890",
      },
      {
        _id: "2",
        email: "empresa2@example.com",
        password: "********",
        role: "empresa",
        createdAt: "2023-01-02",
        nombreEmpresa: "Innovation Labs",
        descripcion: "Laboratorio de innovación y desarrollo",
        sitioWeb: "https://innovationlabs.example.com",
        telefono: "+0987654321",
      },
      // Emprendedores
      {
        _id: "3",
        email: "maria.gonzalez@example.com",
        password: "********",
        role: "emprendedor",
        createdAt: "2023-01-03",
        nombreCompleto: "María González",
        telefono: "+0987654323",
        edad: 18,
      },
      {
        _id: "4",
        email: "carlos.rodriguez@example.com",
        password: "********",
        role: "emprendedor",
        createdAt: "2023-01-04",
        telefono: "+0987654322",
        nombreCompleto: "Carlos Rodríguez",
        edad: 25,
      },
    ];

    if (storage.getUsers().length === 0) {
      storage.setUsers(sampleUsers);
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
          emprendedorId: "3",
          tituloPropuesta: "App Móvil con React Native",
          descripcion:
            "Propongo desarrollar la aplicación usando React Native para máxima compatibilidad",
          fechaCreacion: new Date().toISOString(),
          estado: "en revision",
          puntos: 85,
        },
        {
          id: "2",
          desafioId: "2",
          emprendedorId: "3",
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
