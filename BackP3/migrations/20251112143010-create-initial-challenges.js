import mongodb from 'mongodb'

const { ObjectId } = mongodb

export const up = async (db) => {
  const initialChallenges = [
    {
      _id: new ObjectId('100000000000000000000000'),
      empresaId: new ObjectId('000000000000000000000001'), // empresa@plataforma.com
      titulo: 'Desafío de Innovación Educativa',
      descripcion:
        'Desarrollar una herramienta digital que facilite el aprendizaje interactivo para estudiantes de nivel secundario.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000001'),
      empresaId: new ObjectId('000000000000000000000001'), // misma empresa
      titulo: 'Desafío de Accesibilidad Web',
      descripcion:
        'Crear un sistema que mejore la accesibilidad de los sitios web para personas con discapacidad visual.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000002'),
      empresaId: new ObjectId('000000000000000000000001'), // misma empresa
      titulo: 'Desafío de Sostenibilidad Digital',
      descripcion:
        'Optimizar el consumo energético en aplicaciones web mediante tecnologías verdes.',
      estado: 'inactivo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000003'),
      empresaId: new ObjectId('000000000000000000000001'),
      titulo: 'Optimización de Procesos Internos',
      descripcion: 'Crear un dashboard para monitorear KPIs de la empresa.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000004'),
      empresaId: new ObjectId('000000000000000000000005'),
      titulo: 'Sistema de Turnos Inteligentes',
      descripcion: 'Desarrollar un sistema para gestionar turnos con IA.',
      estado: 'inactivo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000005'),
      empresaId: new ObjectId('000000000000000000000009'),
      titulo: 'Mejora de Experiencia de Usuario',
      descripcion: 'Crear una nueva interfaz accesible y responsiva.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000006'),
      empresaId: new ObjectId('000000000000000000000001'),
      titulo: 'Automatización de Reportes',
      descripcion: 'Automatizar generación de reportes semanales.',
      estado: 'inactivo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000007'),
      empresaId: new ObjectId('000000000000000000000006'),
      titulo: 'Aplicación de Capacitación Interna',
      descripcion: 'Implementar un sistema para capacitar empleados vía app.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000008'),
      empresaId: new ObjectId('000000000000000000000009'),
      titulo: 'Integración Multiplataforma',
      descripcion: 'Conectar servicios internos mediante APIs unificadas.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000009'),
      empresaId: new ObjectId('000000000000000000000001'),
      titulo: 'Sistema de Gestión Documental',
      descripcion: 'Crear un módulo para almacenar y buscar documentos.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000010'),
      empresaId: new ObjectId('000000000000000000000009'),
      titulo: 'Plataforma de Encuestas Dinámicas',
      descripcion: 'Sistema flexible para crear encuestas internas.',
      estado: 'inactivo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000011'),
      empresaId: new ObjectId('000000000000000000000006'),
      titulo: 'Optimización de Costos Operativos',
      descripcion: 'Analizar consumo de recursos y reducir costos.',
      estado: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('100000000000000000000012'),
      empresaId: new ObjectId('000000000000000000000005'),
      titulo: 'Sistema de Alertas Tempranas',
      descripcion: 'Detectar fallas técnicas antes de que ocurran.',
      estado: 'inactivo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.collection('challenges').insertMany(initialChallenges)
}

export const down = async (db) => {
  await db.collection('challenges').deleteMany({
    _id: {
      $in: [
        new ObjectId('100000000000000000000000'),
        new ObjectId('100000000000000000000001'),
        new ObjectId('100000000000000000000002'),
      ],
    },
  })
}
