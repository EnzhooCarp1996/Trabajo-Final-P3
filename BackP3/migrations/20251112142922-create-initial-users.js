import mongodb from 'mongodb'
import bcrypt from 'bcrypt'

const { ObjectId } = mongodb

export const up = async (db) => {
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  }

  const initialUsers = [
    {
      _id: new ObjectId('000000000000000000000000'),
      email: 'enzo@plataforma.com',
      password: await hashPassword('admin123'),
      role: new ObjectId('000000000000000000000002'), // Emprendedor
      nombreCompleto: 'Enzo Olmedo',
      telefono: '1111111111',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000001'),
      email: 'empresa@plataforma.com',
      password: await hashPassword('empresa123'),
      role: new ObjectId('000000000000000000000001'), // Empresa
      nombreEmpresa: 'Soluciones Innovadoras S.A.',
      descripcion: 'Empresa dedicada al desarrollo de software educativo.',
      sitioWeb: 'https://soluciones.com',
      telefono: '2222222222',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000002'),
      email: 'usuario@plataforma.com',
      password: await hashPassword('usuario123'),
      role: new ObjectId('000000000000000000000002'), // Emprendedor
      nombreCompleto: 'Juan Pérez',
      edad: 25,
      telefono: '3333333333',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.collection('users').insertMany(initialUsers)
}

export const down = async (db) => {
  await db.collection('users').deleteMany({
    _id: {
      $in: [
        new mongodb.ObjectId('000000000000000000000000'),
        new mongodb.ObjectId('000000000000000000000001'),
        new mongodb.ObjectId('000000000000000000000002'),
      ],
    },
  })
}
