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
      password: await hashPassword('emprendedor123'),
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
    {
      _id: new ObjectId('000000000000000000000003'),
      email: 'maria@plataforma.com',
      password: await hashPassword('maria123'),
      role: new ObjectId('000000000000000000000002'),
      nombreCompleto: 'María López',
      edad: 29,
      telefono: '4444444444',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000004'),
      email: 'carlos@plataforma.com',
      password: await hashPassword('carlos123'),
      role: new ObjectId('000000000000000000000002'),
      nombreCompleto: 'Carlos Gómez',
      edad: 32,
      telefono: '5555555555',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000005'),
      email: 'empresa2@plataforma.com',
      password: await hashPassword('empresa456'),
      role: new ObjectId('000000000000000000000001'),
      nombreEmpresa: 'Tech World S.R.L.',
      descripcion: 'Soluciones tecnológicas para pymes.',
      sitioWeb: 'https://techworld.com',
      telefono: '6666666666',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000006'),
      email: 'empresa3@plataforma.com',
      password: await hashPassword('empresa789'),
      role: new ObjectId('000000000000000000000001'),
      nombreEmpresa: 'AgroDigital S.A.',
      descripcion: 'Tecnología aplicada al sector agrícola.',
      sitioWeb: 'https://agrodigital.com',
      telefono: '7777777777',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000007'),
      email: 'sofia@plataforma.com',
      password: await hashPassword('sofia123'),
      role: new ObjectId('000000000000000000000002'),
      nombreCompleto: 'Sofía Martínez',
      edad: 27,
      telefono: '8888888888',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000008'),
      email: 'lucas@plataforma.com',
      password: await hashPassword('lucas123'),
      role: new ObjectId('000000000000000000000002'),
      nombreCompleto: 'Lucas Fernández',
      edad: 30,
      telefono: '9999999999',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000009'),
      email: 'empresa4@plataforma.com',
      password: await hashPassword('empresa321'),
      role: new ObjectId('000000000000000000000001'),
      nombreEmpresa: 'Digital Factory S.A.',
      descripcion: 'Desarrollo de plataformas web empresariales.',
      sitioWeb: 'https://digitalfactory.com',
      telefono: '1010101010',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000010'),
      email: 'empresa5@plataforma.com',
      password: await hashPassword('empresa159'),
      role: new ObjectId('000000000000000000000001'),
      nombreEmpresa: 'Eco Solutions SRL',
      descripcion: 'Soluciones ecológicas para empresas.',
      sitioWeb: 'https://ecosolutions.com',
      telefono: '1212121212',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000011'),
      email: 'julia@plataforma.com',
      password: await hashPassword('julia123'),
      role: new ObjectId('000000000000000000000002'),
      nombreCompleto: 'Julia Castillo',
      edad: 24,
      telefono: '1313131313',
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('000000000000000000000012'),
      email: 'martin@plataforma.com',
      password: await hashPassword('martin123'),
      role: new ObjectId('000000000000000000000002'),
      nombreCompleto: 'Martín Suarez',
      edad: 35,
      telefono: '1414141414',
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
