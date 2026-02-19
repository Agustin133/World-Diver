# 🚀 Guía de Deployment - World Divers

## Arquitectura de Deployment

- **Frontend (React)** → Vercel
- **Backend (Node.js/Express)** → Railway (recomendado) o Render
- **Base de Datos** → MongoDB Atlas (ya configurado)

---

## 📦 PARTE 1: Deploy del Backend en Railway

### Paso 1: Crear cuenta en Railway

1. Ve a https://railway.app
2. Regístrate con GitHub
3. Click en "New Project"

### Paso 2: Deploy desde GitHub

1. **Conecta tu repositorio:**
   - "Deploy from GitHub repo"
   - Selecciona tu repositorio `World-Diver`
   - Railway detectará automáticamente Node.js

2. **Configurar Root Directory:**
   - Settings → Root Directory → `backend`
   - Esto le dice a Railway que el código está en la carpeta backend

3. **Agregar Variables de Entorno:**
   - Variables → Add Variable
   - Agrega estas variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://Waso:Wasko42788357%21@worlddivers.pawmaj0.mongodb.net/world-divers?retryWrites=true&w=majority&appName=worldDivers
   JWT_SECRET=world_divers_super_secret_key_2024_change_in_production
   NODE_ENV=production
   ```

4. **Deploy:**
   - Railway desplegará automáticamente
   - Obtendrás una URL como: `https://world-diver-backend.up.railway.app`

### Paso 3: Verificar el Backend

Visita: `https://tu-backend-url.railway.app/`
Deberías ver: `{"message": "World Divers API is running 🌊"}`

---

## 🌐 PARTE 2: Deploy del Frontend en Vercel

### Paso 1: Preparar el proyecto

Ya está listo, solo necesitas configurar las variables de entorno.

### Paso 2: Deploy en Vercel

1. **Conectar con GitHub:**
   - Ve a https://vercel.com
   - "Add New Project"
   - Importa tu repositorio `World-Diver`

2. **Configurar el proyecto:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `.` (raíz del proyecto)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

3. **Variables de Entorno:**
   - Settings → Environment Variables
   - Agrega:
   ```
   REACT_APP_API_URL=https://tu-backend-url.railway.app/api
   ```
   ⚠️ **IMPORTANTE:** Reemplaza con tu URL real de Railway

4. **Deploy:**
   - Click "Deploy"
   - Vercel construirá y desplegará tu app
   - Obtendrás una URL como: `https://world-divers.vercel.app`

---

## ✅ PARTE 3: Verificación

### Backend (Railway)
```bash
# Test de conexión
curl https://tu-backend-url.railway.app/

# Test de planes
curl https://tu-backend-url.railway.app/api/memberships/plans
```

### Frontend (Vercel)
1. Visita tu URL de Vercel
2. Intenta registrarte
3. Verifica que puedas iniciar sesión
4. Prueba ver las membresías

---

## 🔧 Alternativa: Backend en Render

Si prefieres Render en lugar de Railway:

1. Ve a https://render.com
2. "New +" → "Web Service"
3. Conecta tu repo de GitHub
4. Configuración:
   - **Name:** world-divers-backend
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
   - **Plan:** Free

5. Variables de entorno (igual que Railway)

---

## 🔒 Seguridad en Producción

### Backend: Actualizar CORS

Edita `backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://world-divers.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### MongoDB Atlas: Configurar IP

1. Ve a MongoDB Atlas
2. Network Access
3. Agrega: `0.0.0.0/0` (permite todas las IPs)
   - O agrega las IPs específicas de Railway/Render

---

## 🔄 Actualizaciones Automáticas

Ambos servicios tienen **auto-deploy**:

- **Push a GitHub** → Railway y Vercel detectan cambios
- **Deploy automático** → Sin hacer nada más

---

## 📊 Monitoreo

### Railway
- Dashboard → Logs
- Ver errores y peticiones en tiempo real

### Vercel
- Dashboard → Deployments
- Analytics y logs de errores

---

## 💰 Costos

- **MongoDB Atlas:** Gratis (512 MB)
- **Railway:** $5 de crédito gratis/mes
- **Vercel:** Gratis (ilimitado para hobby)
- **Render:** Gratis (con limitaciones)

---

## 🆘 Troubleshooting

### Error: CORS
- Verifica que el backend tenga configurado CORS con la URL de Vercel

### Error: API no responde
- Verifica que `REACT_APP_API_URL` esté correctamente configurado
- Debe incluir `/api` al final

### Error: MongoDB no conecta
- Verifica que MongoDB Atlas permita conexiones desde cualquier IP
- Verifica que la contraseña esté correctamente codificada (%21 para !)

---

## 📝 Checklist Final

- [ ] Backend desplegado en Railway/Render
- [ ] Variables de entorno configuradas en Railway/Render
- [ ] Backend responde en la URL pública
- [ ] Frontend desplegado en Vercel
- [ ] `REACT_APP_API_URL` configurado en Vercel
- [ ] CORS configurado en el backend
- [ ] MongoDB Atlas permite conexiones
- [ ] Registro de usuarios funciona
- [ ] Login funciona
- [ ] Membresías se muestran correctamente
