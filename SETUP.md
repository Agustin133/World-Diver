# 🌊 World Divers - Guía de Instalación Completa

## 📋 Requisitos Previos

- **Node.js** (v16 o superior)
- **MongoDB** (v5 o superior)
- **npm** o **yarn**

## 🚀 Instalación

### 1. Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus configuraciones
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/world-divers
# JWT_SECRET=tu_clave_secreta_super_segura
```

### 2. Frontend

```bash
# Volver a la raíz del proyecto
cd ..

# Instalar dependencias del frontend
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env
# REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Base de Datos

Asegúrate de que MongoDB esté corriendo:

**Windows:**
```bash
# Iniciar MongoDB
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongodb
# o
brew services start mongodb-community
```

## ▶️ Ejecutar la Aplicación

### Opción 1: Dos terminales separadas

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Opción 2: Script único (próximamente)

```bash
npm run dev:all
```

## 🌐 Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## 🔐 Funcionalidades de Autenticación

### Crear Usuario
1. Ve a http://localhost:3000/signup
2. Completa el formulario de registro
3. Serás redirigido a la página de membresías

### Iniciar Sesión
1. Ve a http://localhost:3000/login
2. Ingresa email y contraseña
3. Accederás a funciones protegidas

### Membresías Disponibles

- **Explorador** (Gratis): Funciones básicas
- **Buceador Pro** ($9.99/mes): Funciones avanzadas
- **Centro de Buceo** ($49.99/mes): Funciones empresariales

## 📡 Endpoints API

### Autenticación
- `POST /api/auth/signup` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuario actual

### Membresías
- `GET /api/memberships/plans` - Ver planes
- `POST /api/memberships/subscribe` - Suscribirse
- `GET /api/memberships/current` - Membresía actual
- `POST /api/memberships/cancel` - Cancelar

### Favoritos
- `GET /api/favorites` - Ver favoritos
- `POST /api/favorites/add` - Agregar
- `DELETE /api/favorites/remove/:id` - Eliminar

## 🐛 Solución de Problemas

### MongoDB no conecta
```bash
# Verificar que MongoDB esté corriendo
mongosh

# Si no está corriendo, iniciarlo
mongod
```

### Error de CORS
Asegúrate de que el backend tenga configurado CORS correctamente en `server.js`

### Token inválido
Limpia el localStorage del navegador:
```javascript
localStorage.clear()
```

## 📦 Deployment

### Backend (Railway/Render/Heroku)
1. Configura las variables de entorno
2. Conecta tu repositorio
3. Despliega

### Frontend (Vercel/Netlify)
1. Configura `REACT_APP_API_URL` con la URL de tu backend
2. Conecta tu repositorio
3. Despliega

## 🔒 Seguridad

- Cambia `JWT_SECRET` en producción
- Usa HTTPS en producción
- Configura CORS apropiadamente
- No expongas credenciales en el código

## 📚 Documentación Adicional

- [Backend README](./backend/README.md)
- [Frontend README](./README.md)
