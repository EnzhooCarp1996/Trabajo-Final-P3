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
