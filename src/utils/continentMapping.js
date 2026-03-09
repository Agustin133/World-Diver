/**
 * Mapeo estándar de países a continentes
 */
export const countryToContinentMap = {
  // América del Norte
  'Estados Unidos': 'América del Norte',
  'USA': 'América del Norte',
  'Canadá': 'América del Norte',
  'México': 'América del Norte',
  'Bahamas': 'América del Norte',
  'Cuba': 'América del Norte',
  'Jamaica': 'América del Norte',
  'República Dominicana': 'América del Norte',
  'Costa Rica': 'América del Norte',
  'Panamá': 'América del Norte',
  'Belice': 'América del Norte',
  'Honduras': 'América del Norte',
  'Guatemala': 'América del Norte',
  
  // América del Sur
  'Brasil': 'América del Sur',
  'Argentina': 'América del Sur',
  'Chile': 'América del Sur',
  'Colombia': 'América del Sur',
  'Ecuador': 'América del Sur',
  'Perú': 'América del Sur',
  'Venezuela': 'América del Sur',
  'Bolivia': 'América del Sur',
  'Paraguay': 'América del Sur',
  'Uruguay': 'América del Sur',
  'Guyana': 'América del Sur',
  'Surinam': 'América del Sur',
  
  // Europa
  'España': 'Europa',
  'Francia': 'Europa',
  'Italia': 'Europa',
  'Alemania': 'Europa',
  'Reino Unido': 'Europa',
  'Portugal': 'Europa',
  'Grecia': 'Europa',
  'Croacia': 'Europa',
  'Noruega': 'Europa',
  'Suecia': 'Europa',
  'Islandia': 'Europa',
  'Irlanda': 'Europa',
  'Malta': 'Europa',
  'Chipre': 'Europa',
  
  // África
  'Egipto': 'África',
  'Sudáfrica': 'África',
  'Kenia': 'África',
  'Tanzania': 'África',
  'Mozambique': 'África',
  'Madagascar': 'África',
  'Mauricio': 'África',
  'Seychelles': 'África',
  'Marruecos': 'África',
  'Túnez': 'África',
  
  // Asia
  'Tailandia': 'Asia',
  'Filipinas': 'Asia',
  'Indonesia': 'Asia',
  'Malasia': 'Asia',
  'Japón': 'Asia',
  'China': 'Asia',
  'India': 'Asia',
  'Maldivas': 'Asia',
  'Sri Lanka': 'Asia',
  'Vietnam': 'Asia',
  'Camboya': 'Asia',
  'Myanmar': 'Asia',
  'Singapur': 'Asia',
  
  // Oceanía
  'Australia': 'Oceanía',
  'Nueva Zelanda': 'Oceanía',
  'Fiji': 'Oceanía',
  'Papúa Nueva Guinea': 'Oceanía',
  'Palau': 'Oceanía',
  'Micronesia': 'Oceanía',
  'Islas Salomón': 'Oceanía',
  'Vanuatu': 'Oceanía',
  'Polinesia Francesa': 'Oceanía',
  'Tahití': 'Oceanía',
  
  // Antártida
  'Antártida': 'Antártida'
};

/**
 * Obtiene el continente de un país
 * @param {string} country - Nombre del país
 * @returns {string} - Nombre del continente o 'Otro' si no se encuentra
 */
export const getContinent = (country) => {
  if (!country) return 'Otro';
  return countryToContinentMap[country] || 'Otro';
};

/**
 * Obtiene lista de continentes únicos de un array de destinos
 * @param {Array} destinations - Array de destinos
 * @returns {Array} - Array de continentes únicos ordenados
 */
export const getContinentsFromDestinations = (destinations) => {
  const continents = new Set();
  destinations.forEach(dest => {
    if (dest.country) {
      const continent = getContinent(dest.country);
      continents.add(continent);
    }
  });
  return Array.from(continents).sort();
};

/**
 * Filtra destinos por continente
 * @param {Array} destinations - Array de destinos
 * @param {string} continent - Continente a filtrar
 * @returns {Array} - Destinos filtrados
 */
export const filterByContinent = (destinations, continent) => {
  if (!continent || continent === 'all') return destinations;
  return destinations.filter(dest => getContinent(dest.country) === continent);
};
