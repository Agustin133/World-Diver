# Marine Season Tracker 🌊

Plataforma web para buceadores que permite consultar qué animales marinos se pueden ver, en qué fecha y en qué lugar del mundo.

## 🚀 Características

### Página Principal (Home)
- **Importancia de la vida marina**: Información educativa sobre el ecosistema oceánico
- **Acerca de nosotros**: Misión, valores y equipo detrás del proyecto
- **Diseño atractivo**: Hero section con call-to-action

### Explorar
- **Búsqueda en tiempo real**: Filtra por nombre de animal o destino
- **Filtro por mes**: Encuentra qué animales están disponibles en cada mes del año
- **Grid de resultados**: Visualización en tarjetas con toda la información

### Top 5 Animales
- **Encuentros destacados**: Los 5 animales marinos más espectaculares
- **Información detallada**: Descripción completa de cada especie
- **Ranking visual**: Diseño especial para destacar cada posición

### Servicios
- **Navegación por pestañas**: Alterna entre Destinos Destacados y Promociones
- **Destinos Destacados**: 6 destinos de buceo famosos mundialmente
- **Promociones y Descuentos**: Ofertas exclusivas en viajes y equipo
- **Vistas separadas**: Cada sección tiene su propia interfaz dedicada

### Mundo
- **Mapa interactivo**: Visualiza destinos de buceo en un mapa mundial
- **Marcadores clickeables**: Cada destino tiene un marcador en su ubicación geográfica
- **Detalles expandibles**: Click en marcadores para ver información completa
- **Navegación fluida**: Mueve y explora el mapa libremente

### Conservación Marina
- **6 organizaciones destacadas**: Enlaces directos a organizaciones líderes en conservación
- **Información de impacto**: Estadísticas sobre la importancia de los océanos
- **Llamado a la acción**: Formas concretas de ayudar y apoyar
- **Enlaces de donación**: Acceso directo para contribuir a cada organización
- **Diseño prominente**: Botón destacado en navegación con icono de corazón

## 🛠️ Stack Tecnológico

- **React.js** (18.2.0) - Framework principal
- **React Router DOM** (6.14.2) - Navegación multi-página
- **React Leaflet** (4.2.1) - Mapas interactivos
- **Leaflet** (1.9.4) - Biblioteca de mapas
- **Tailwind CSS** (3.3.2) - Estilos y diseño
- **Lucide React** - Iconos modernos
- **JavaScript ES6+**

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🎨 Paleta de Colores

- **Ocean Deep**: #001219 - Azul profundo
- **Ocean Blue**: #005f73 - Azul aguamarina
- **Ocean Teal**: #0a9396 - Verde azulado
- **Ocean Light**: #94d2bd - Azul claro

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx          # Barra de navegación con routing
│   ├── HeroSection.jsx     # Sección hero con buscador
│   ├── FilterBar.jsx       # Filtros por mes
│   ├── AnimalCard.jsx      # Tarjeta de animal
│   └── DetailModal.jsx     # Modal con detalles
├── pages/
│   ├── Home.jsx            # Página principal con hero y CTA
│   ├── Explore.jsx         # Página de búsqueda y exploración
│   ├── Top5.jsx            # Top 5 animales destacados
│   ├── Services.jsx        # Destinos y promociones (con pestañas)
│   ├── World.jsx           # Mapa interactivo mundial
│   ├── Conservation.jsx    # Conservación marina y donaciones
│   └── About.jsx           # Historia de World Divers
├── data.json               # Base de datos temporal
├── App.jsx                 # Router principal
├── index.js                # Punto de entrada
└── index.css               # Estilos globales
```

## 🐠 Animales Incluidos

1. **Tiburón Toro** - Playa del Carmen, México (Nov-Mar)
2. **Tiburón Ballena** - Mozambique (Oct-Feb)
3. **Manta Raya** - Islas Maldivas (May-Nov)
4. **Gran Tiburón Blanco** - Gansbaai, Sudáfrica (Abr-Sep)
5. **Tortuga Verde** - Gran Barrera de Coral, Australia (Todo el año)

## 🌐 Páginas Disponibles

- **/** - Página principal con hero, importancia de la vida marina y call to action
- **/explorar** - Búsqueda y filtrado de animales marinos por nombre, destino y mes
- **/top5** - Top 5 encuentros más espectaculares del mundo
- **/servicios** - Destinos destacados y promociones (navegación por pestañas)
- **/mundo** - Mapa interactivo mundial con marcadores de destinos de buceo
- **/conservacion** - Organizaciones de conservación marina con enlaces de donación
- **/acerca-de** - Historia completa de World Divers, misión y valores

## 🔄 Próximas Funcionalidades

- Integración con mapas interactivos (Google Maps/Mapbox)
- Sistema de autenticación y perfiles de usuario
- Base de datos real con más especies
- Reseñas y calificaciones de usuarios
- Sistema de reservas con centros de buceo
- Blog y contenido educativo
- API pública para desarrolladores

## 📝 Comandos Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Crea la versión de producción
- `npm test` - Ejecuta los tests

---

Desarrollado con ❤️ para la comunidad de buceadores

