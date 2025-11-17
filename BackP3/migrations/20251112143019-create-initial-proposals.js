import mongodb from 'mongodb'

const { ObjectId } = mongodb

export const up = async (db) => {
  const initialProposals = [
    {
      _id: new ObjectId('200000000000000000000000'),
      desafioId: new ObjectId('100000000000000000000000'), // Desafío de Innovación Educativa
      emprendedorId: new ObjectId('000000000000000000000002'), // Juan Pérez
      tituloPropuesta: 'Plataforma Interactiva para Aprendizaje STEM',
      descripcion:
        'Propuesta para desarrollar una plataforma gamificada enfocada en el aprendizaje de ciencia y tecnología, con retos interactivos y recompensas.',
      estado: 'en revision',
      puntos: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000001'),
      desafioId: new ObjectId('100000000000000000000001'), // Desafío de Accesibilidad Web
      emprendedorId: new ObjectId('000000000000000000000002'), // Juan Pérez
      tituloPropuesta: 'Lector Inteligente de Contenido Web',
      descripcion:
        'Sistema basado en IA que lee y traduce contenido web en tiempo real para personas con discapacidad visual o auditiva.',
      estado: 'seleccionada',
      puntos: 90,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000002'),
      desafioId: new ObjectId('100000000000000000000002'), // Desafío de Sostenibilidad Digital
      emprendedorId: new ObjectId('000000000000000000000002'), // Juan Pérez
      tituloPropuesta: 'Optimizador Ecológico de Servidores',
      descripcion:
        'Aplicación que monitorea el consumo energético de servidores y aplica estrategias de reducción basadas en horarios de baja demanda.',
      estado: 'descartada',
      puntos: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000003'),
      desafioId: new ObjectId('100000000000000000000003'),
      emprendedorId: new ObjectId('000000000000000000000004'),
      tituloPropuesta: 'Dashboard Predictivo de KPIs',
      descripcion:
        'Implementación de un panel inteligente con análisis predictivo para la toma de decisiones.',
      estado: 'en revision',
      puntos: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000004'),
      desafioId: new ObjectId('100000000000000000000004'),
      emprendedorId: new ObjectId('000000000000000000000011'),
      tituloPropuesta: 'Turnero con IA Conversacional',
      descripcion: 'Sistema que asigna turnos automáticamente mediante un chatbot inteligente.',
      estado: 'seleccionada',
      puntos: 84,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000005'),
      desafioId: new ObjectId('100000000000000000000005'),
      emprendedorId: new ObjectId('000000000000000000000000'),
      tituloPropuesta: 'UX Rediseñado con Accesibilidad Nivel AAA',
      descripcion:
        'Propuesta para rediseñar la plataforma con estándares de accesibilidad avanzados.',
      estado: 'en revision',
      puntos: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000006'),
      desafioId: new ObjectId('100000000000000000000006'),
      emprendedorId: new ObjectId('000000000000000000000004'),
      tituloPropuesta: 'Automatización de Reportes Cloud',
      descripcion: 'Generador automático de reportes con almacenamiento en la nube.',
      estado: 'descartada',
      puntos: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000007'),
      desafioId: new ObjectId('100000000000000000000007'),
      emprendedorId: new ObjectId('000000000000000000000002'),
      tituloPropuesta: 'App de Capacitación Interna Gamificada',
      descripcion: 'Aplicación móvil con módulos de capacitación usando gamificación.',
      estado: 'seleccionada',
      puntos: 92,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000008'),
      desafioId: new ObjectId('100000000000000000000008'),
      emprendedorId: new ObjectId('000000000000000000000011'),
      tituloPropuesta: 'Middleware Unificado de APIs',
      descripcion:
        'Capa de integración que conecta múltiples servicios internos mediante API Gateway.',
      estado: 'en revision',
      puntos: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000009'),
      desafioId: new ObjectId('100000000000000000000009'),
      emprendedorId: new ObjectId('000000000000000000000002'),
      tituloPropuesta: 'Gestor Documental con Búsqueda Semántica',
      descripcion: 'Sistema para indexar documentos con búsqueda inteligente basada en IA.',
      estado: 'descartada',
      puntos: 41,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000010'),
      desafioId: new ObjectId('100000000000000000000010'),
      emprendedorId: new ObjectId('000000000000000000000000'),
      tituloPropuesta: 'Constructor Dinámico de Encuestas',
      descripcion: 'Plataforma para crear y analizar encuestas internas en tiempo real.',
      estado: 'seleccionada',
      puntos: 87,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000011'),
      desafioId: new ObjectId('100000000000000000000011'),
      emprendedorId: new ObjectId('000000000000000000000002'),
      tituloPropuesta: 'Analizador de Costos con Machine Learning',
      descripcion: 'Herramienta para detectar excesos en gastos operativos mediante modelos ML.',
      estado: 'en revision',
      puntos: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('200000000000000000000012'),
      desafioId: new ObjectId('100000000000000000000012'),
      emprendedorId: new ObjectId('000000000000000000000000'),
      tituloPropuesta: 'Sistema de Alertas Tempranas IoT',
      descripcion: 'Sistema basado en sensores IoT para detectar fallas antes de que ocurran.',
      estado: 'descartada',
      puntos: 55,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.collection('proposals').insertMany(initialProposals)
}

export const down = async (db) => {
  await db.collection('proposals').deleteMany({
    _id: {
      $in: [
        new ObjectId('200000000000000000000000'),
        new ObjectId('200000000000000000000001'),
        new ObjectId('200000000000000000000002'),
      ],
    },
  })
}
