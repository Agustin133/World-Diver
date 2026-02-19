# World Divers Backend API

Backend API para la aplicación World Divers con autenticación de usuarios y sistema de membresías.

## 🚀 Tecnologías

- **Node.js** + **Express** - Framework del servidor
- **MongoDB** + **Mongoose** - Base de datos
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas

## 📦 Instalación

```bash
cd backend
npm install
```

## ⚙️ Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configura las variables de entorno en `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/world-divers
JWT_SECRET=tu_clave_secreta_super_segura
NODE_ENV=development
```

## 🗄️ Base de Datos

Asegúrate de tener MongoDB instalado y corriendo:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongodb
```

## 🏃 Ejecutar

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints

### Autenticación (`/api/auth`)

- `POST /api/auth/signup` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere token)

### Usuarios (`/api/users`)

- `GET /api/users/profile` - Ver perfil (requiere token)
- `PUT /api/users/profile` - Actualizar perfil (requiere token)

### Membresías (`/api/memberships`)

- `GET /api/memberships/plans` - Ver planes disponibles
- `POST /api/memberships/subscribe` - Suscribirse a un plan (requiere token)
- `GET /api/memberships/current` - Ver membresía actual (requiere token)
- `POST /api/memberships/cancel` - Cancelar membresía (requiere token)

### Favoritos (`/api/favorites`)

- `GET /api/favorites` - Ver favoritos (requiere token)
- `POST /api/favorites/add` - Agregar favorito (requiere token)
- `DELETE /api/favorites/remove/:destinationId` - Eliminar favorito (requiere token)

## 🔐 Autenticación

Incluye el token JWT en el header de las peticiones protegidas:

```
Authorization: Bearer <tu_token_jwt>
```

## 📊 Modelos de Datos

### User
- name, email, password
- membershipPlan: 'free' | 'pro' | 'dive-center'
- membershipStatus: 'active' | 'inactive' | 'cancelled'
- favorites: array de IDs de destinos

### Membership
- userId, plan, status
- startDate, expiryDate
- price, paymentMethod, autoRenew
