import mongodb from "mongodb";

const { ObjectId } = mongodb;

export const up = async (db) => {
  const initialMessages = [
    // Empresa 1 -> Emprendedor 1
    {
      _id: new ObjectId("300000000000000000000000"),
      fromUserId: new ObjectId("000000000000000000000001"), // empresa
      toUserId: new ObjectId("000000000000000000000002"),   // emprendedor
      contenido:
        "Hola Juan, nos interesó tu propuesta sobre la plataforma educativa. ¿Podrías explicar cómo gestionaría el sistema el almacenamiento de contenidos?",
      visto: false,
      createdAt: new Date("2025-11-10T10:00:00Z"),
      updatedAt: new Date("2025-11-10T10:00:00Z"),
    },

    // Empresa 1 -> Emprendedor 1 (otro mensaje)
    {
      _id: new ObjectId("300000000000000000000001"),
      fromUserId: new ObjectId("000000000000000000000001"),
      toUserId: new ObjectId("000000000000000000000002"),
      contenido:
        "Nos gustó tu solución sobre accesibilidad. ¿Evaluaste compatibilidad con lectores NVDA o VoiceOver?",
      visto: true,
      createdAt: new Date("2025-11-10T11:10:00Z"),
      updatedAt: new Date("2025-11-10T11:25:00Z"),
    },

    // Empresa 1 -> Emprendedor 2
    {
      _id: new ObjectId("300000000000000000000002"),
      fromUserId: new ObjectId("000000000000000000000001"),
      toUserId: new ObjectId("000000000000000000000003"), // María López
      contenido:
        "Hola María, ¿tenés métricas estimadas del ahorro energético que propondría tu solución?",
      visto: false,
      createdAt: new Date("2025-11-10T12:00:00Z"),
      updatedAt: new Date("2025-11-10T12:00:00Z"),
    },

    // Empresa 2 -> Emprendedor 1
    {
      _id: new ObjectId("300000000000000000000003"),
      fromUserId: new ObjectId("000000000000000000000004"), // empresa 2
      toUserId: new ObjectId("000000000000000000000002"),
      contenido:
        "Juan, tu idea sobre paneles solares inteligentes nos llamó la atención. ¿Incluye monitoreo en tiempo real?",
      visto: true,
      createdAt: new Date("2025-11-11T09:30:00Z"),
      updatedAt: new Date("2025-11-11T09:45:00Z"),
    },

    // Empresa 3 -> Emprendedor 3
    {
      _id: new ObjectId("300000000000000000000004"),
      fromUserId: new ObjectId("000000000000000000000005"), // empresa 3
      toUserId: new ObjectId("000000000000000000000003"),
      contenido:
        "María, excelente propuesta. ¿Podrías detallar el tipo de sensores utilizados y su mantenimiento?",
      visto: false,
      createdAt: new Date("2025-11-11T14:00:00Z"),
      updatedAt: new Date("2025-11-11T14:00:00Z"),
    },
  ];

  await db.collection("messages").insertMany(initialMessages);
};

export const down = async (db) => {
  await db.collection("messages").deleteMany({
    _id: {
      $in: [
        new ObjectId("300000000000000000000000"),
        new ObjectId("300000000000000000000001"),
        new ObjectId("300000000000000000000002"),
        new ObjectId("300000000000000000000003"),
        new ObjectId("300000000000000000000004"),
      ],
    },
  });
};
