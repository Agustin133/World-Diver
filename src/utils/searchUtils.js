/**
 * Normaliza texto eliminando acentos y convirtiéndolo a minúsculas
 * para búsquedas insensibles a acentos y mayúsculas
 * @param {string} text - Texto a normalizar
 * @returns {string} - Texto normalizado
 */
export const normalizeText = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Compara dos textos de forma normalizada
 * @param {string} text1 - Primer texto
 * @param {string} text2 - Segundo texto
 * @returns {boolean} - True si los textos coinciden
 */
export const normalizedIncludes = (text1, text2) => {
  return normalizeText(text1).includes(normalizeText(text2));
};

/**
 * Filtra un array de objetos basándose en múltiples campos de búsqueda
 * @param {Array} items - Array de objetos a filtrar
 * @param {string} searchTerm - Término de búsqueda
 * @param {Array<string>} fields - Campos del objeto donde buscar
 * @returns {Array} - Array filtrado
 */
export const searchInFields = (items, searchTerm, fields) => {
  if (!searchTerm) return items;
  
  const normalizedSearch = normalizeText(searchTerm);
  
  return items.filter(item => {
    return fields.some(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], item);
      return value && normalizeText(String(value)).includes(normalizedSearch);
    });
  });
};
