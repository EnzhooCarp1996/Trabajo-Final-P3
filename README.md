# Plataforma de Innovación y Propuestas Empresariales

📦 Estructura del repositorio (Monorepo)

Este repositorio contiene tanto el Back-End como el Front-End:

- `/BackP3` → API REST (Node.js + Express + MongoDB)
- `/FrontP3` → Cliente Web (React + Vite)


## 📖 Descripción

Plataforma web full stack para la gestión de desafíos empresariales, donde empresas publican problemáticas reales y emprendedores proponen soluciones, permitiendo la evaluación, votación y selección de propuestas.

## ✨ Características Principales

### Para Empresas
- **Gestión de su perfil/datos** 
- **Gestión de desafíos** 
- **Gestión de estado de las propuestas a sus desafíos** 
- **Gestión de votos hacia todas las propuestas**
- **Mensajes hacia emprendedores**
- **Sistema de perfil**
- **Notificaciones**

### Para Emprendedores
- **Gestión de su perfil/datos**
- **Gestión de propuestas hacia desafíos**
- **Gestión de suscripciones**
- **Sistema de perfil**
- **Notificaciones**

## 🛠️ Stack Tecnológico
# Back-End
- **Framework**: Node.js, Express.js 5.1.0
- **Lenguaje:** TypeScript 5.9.3
- **Base de Datos**: MongoDB con Mongoose 8.19.2
- **Autenticación**: JWT (JSON Web Tokens)
- **Hasheo**: bcrypt
- - **Real-time:** Socket.io 4.8.1
- **Dev Tools**: ESLint, Prettier, nodemon

# Front-End
- **Framework:** React 18.3.1
- **Lenguaje:** TypeScript 5.8.3
- **Build Tool:** Vite 7.1.12
- **UI Library:** Material-UI (MUI) 7.3.2, AntD 5.19.0
- **Routing:** React Router DOM 7.9.3
- **HTTP Client:** Axios 1.12.2
- **State Management:** React Hooks + Context
- **Real-time:** Socket.io Client 4.8.1
- **Linting:** ESLint 9.36.0

## 🔧 Instalación Back-End

### Pre-requisitos

- Node.js (v16 o superior)
- npm
- MongoDB

### Configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/EnzhooCarp1996/Trabajo-Final-P3.git
cd Trabajo-Final-P3
```

2. **Instalar dependencias**
```bash
cd BackP3
npm install
```
```bash
cd ..
```
```bash
cd FrontP3
npm install
```

3. **Configurar variables de entorno Back-End:**

Ajustar las variables en `.env.development` según tu entorno
```env
# Ejemplo de .env
NODE_ENV=development
PORT=4000
MONGO_URL=mongodb://127.0.0.1:27017/
MONGO_DB=PlataformaDeDesafios
DEBUG=trabajo-final-p3:*
JWT_SECRET=clave_super_segura_123
JWT_ISSUER=PlataformaDeDesafiosAPI
```

```bash
$env:NODE_ENV="development"
```

4. **Para ejecutar migraciones locales (Back-End)**
```bash
cd BackP3
npm run migrate
```

5. **Iniciar Back-End**
```bash
# Desarrollo
npm run dev
```

6. **Configurar variables de entorno Front-End:**

Editar `.env.local` con la configuración de tu API backend.
```env
# Ejemplo de .env.local
VITE_API_BASE_URL=http://localhost:4000
```
7. **Iniciar Front-End**
```bash
cd FrontP3
npm run dev
```
   
8. **Acceder a la aplicación**
Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## ⚠️ Usuarios de prueba solo disponibles en entorno local / académico.
```javascript
// Empresa
email: empresa@plataforma.com
password: empresa123

// Emprendedor
email: enzo@plataforma.com
password: emprendedor123
```

## 📚 API Endpoints

### Autenticación
```http
POST /auth/register    # Registro de usuario
POST /auth/            # Inicio de sesión
```

### Usuarios
```http
GET    /users         # Listar usuarios por role
GET    /users/:id     # Obtener usuario por ID
POST   /users/        # Suscripción de usuario
PUT    /users/:id     # Actualizar perfil
DELETE /users/:id     # Eliminar usuario
```

### Desafíos
```http
GET    /challenges         # Listar desafíos por estado
GET    /challenges/:id     # Obtener desafío por ID
POST   /challenges/        # Alta de desafío
PUT    /challenges/:id     # Actualizar desafío
DELETE /challenges/:id     # Eliminar desafío
```

### Propuestas
```http
GET    /proposals             # Listar propuestas por estado
GET    /proposals/:id         # Obtener propuesta por ID
POST   /proposals/            # Alta de propuesta
PUT    /proposals/:id         # Actualizar propuesta
PUT    /proposals/:id/estado  # Actualizar estado de propuesta para empresas
DELETE /proposals/:id         # Eliminar propuesta
```

### Notificaciones
```http
GET    /notifications             # Listar notificaciones por usuario
GET    /notifications/:id         # Obtener notificacion por ID
POST   /notifications/            # Alta de notificaciones
PUT    /notifications/:id/visto   # Marcar como visto
```

### Votos
```http
GET    /votes/:propuestasId          # Obtener todos los votos de la propuesta con empresa que voto
GET    /votes/:propuestasId/my-Vote  # Obtener el voto ya puesto en la propuesta
POST   /votes/:propuestasId          # Votar propuesta
```

## 🔐 Autenticación y Autorización

### Middleware de Autenticación
```typescript
// Todas las rutas (excepto /auth) requieren token JWT
Authorization: Bearer <jwt_token>
```

### Roles
- **Empresa**
- **Emprendedor**

## 🧠 Conceptos Técnicos Implementados

- Arquitectura REST
- Autenticación JWT con roles
- Autorización por middleware
- Comunicación en tiempo real (Socket.io)
- Manejo de estados de propuestas
- Sistema de notificaciones
- Separación Front / Back

## 📄 Licencia

Desarrollado por Enzo Olmedo para la materia Programación III - INSPT-UTN.
