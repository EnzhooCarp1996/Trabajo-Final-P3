import mongodb from "mongodb";

const { ObjectId } = mongodb;

export const up = async (db) => {
  const initialChallenges = [
    {
      _id: new ObjectId("100000000000000000000000"),
      empresaId: new ObjectId("000000000000000000000001"), // empresa@plataforma.com
      titulo: "Desafío de Innovación Educativa",
      descripcion: "Desarrollar una herramienta digital que facilite el aprendizaje interactivo para estudiantes de nivel secundario.",
      estado: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId("100000000000000000000001"),
      empresaId: new ObjectId("000000000000000000000001"), // misma empresa
      titulo: "Desafío de Accesibilidad Web",
      descripcion: "Crear un sistema que mejore la accesibilidad de los sitios web para personas con discapacidad visual.",
      estado: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId("100000000000000000000002"),
      empresaId: new ObjectId("000000000000000000000001"), // misma empresa
      titulo: "Desafío de Sostenibilidad Digital",
      descripcion: "Optimizar el consumo energético en aplicaciones web mediante tecnologías verdes.",
      estado: "inactivo",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await db.collection("challenges").insertMany(initialChallenges);
};

export const down = async (db) => {
  await db.collection("challenges").deleteMany({
    _id: {
      $in: [
        new ObjectId("100000000000000000000000"),
        new ObjectId("100000000000000000000001"),
        new ObjectId("100000000000000000000002"),
      ],
    },
  });
};
