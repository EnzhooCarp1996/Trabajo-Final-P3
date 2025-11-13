import mongodb from "mongodb";

const { ObjectId } = mongodb;

export const up = async (db) => {
  const initialMessages = [
    {
      _id: new ObjectId("300000000000000000000000"),
      empresaId: new ObjectId("000000000000000000000001"), // Empresa: Soluciones Innovadoras
      emprendedorId: new ObjectId("000000000000000000000002"), // Emprendedor: Juan Pérez
      propuestaId: new ObjectId("100000000000000000000000"), // Desafío: Innovación Educativa
      contenido:
        "Hola Juan, nos interesó mucho tu propuesta sobre la plataforma interactiva. ¿Podrías contarnos más sobre la arquitectura del sistema?",
      visto: false,
      createdAt: new Date("2025-11-10T10:00:00Z"),
      updatedAt: new Date("2025-11-10T10:00:00Z"),
    },
    {
      _id: new ObjectId("300000000000000000000001"),
      empresaId: new ObjectId("000000000000000000000001"),
      emprendedorId: new ObjectId("000000000000000000000002"),
      propuestaId: new ObjectId("100000000000000000000001"), // Desafío: Accesibilidad Web
      contenido:
        "Tu idea sobre el lector inteligente nos parece excelente. ¿Tienes pensado un stack tecnológico para implementarlo?",
      visto: true,
      createdAt: new Date("2025-11-10T11:30:00Z"),
      updatedAt: new Date("2025-11-10T11:45:00Z"),
    },
    {
      _id: new ObjectId("300000000000000000000002"),
      empresaId: new ObjectId("000000000000000000000001"),
      emprendedorId: new ObjectId("000000000000000000000002"),
      propuestaId: new ObjectId("100000000000000000000002"), // Desafío: Sostenibilidad Digital
      contenido:
        "Gracias por tu propuesta sobre optimización energética. Estamos revisando si podemos integrarla en nuestro sistema de servidores.",
      visto: false,
      createdAt: new Date("2025-11-10T12:00:00Z"),
      updatedAt: new Date("2025-11-10T12:00:00Z"),
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
      ],
    },
  });
};
