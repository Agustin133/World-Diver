import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Anchor, Search } from 'lucide-react';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/destinations`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los destinos');
      }
      
      const data = await response.json();
      const activeDestinations = data.destinations.filter(d => d.isActive);
      setDestinations(activeDestinations);
      setFilteredDestinations(activeDestinations);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let results = [...destinations];

    if (searchTerm) {
      results = results.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (dest.region && dest.region.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedRegion !== 'all') {
      results = results.filter(dest => dest.region === selectedRegion);
    }

    setFilteredDestinations(results);
  }, [searchTerm, selectedRegion, destinations]);

  const regions = [...new Set(destinations.map(d => d.region).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative bg-ocean-deep text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="dest-waves" x="0" y="0" width="150" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 Q 37.5 15, 75 40 T 150 40" stroke="white" fill="none" strokeWidth="2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#dest-waves)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Anchor className="w-12 h-12 mr-4" />
            <h1 className="text-5xl font-bold">Destinos de Buceo</h1>
          </div>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Descubre los mejores lugares del mundo para bucear y explorar la vida marina
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, país o región..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-ocean-light rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent text-lg"
            />
          </div>

          {regions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedRegion === 'all'
                    ? 'bg-ocean-blue text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos
              </button>
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedRegion === region
                      ? 'bg-ocean-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue"></div>
            <p className="text-gray-600 mt-4">Cargando destinos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-red-600">{error}</p>
            <p className="text-gray-500 mt-2">Por favor, intenta recargar la página</p>
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No se encontraron destinos</p>
            <p className="text-gray-500 mt-2">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Aún no hay destinos disponibles'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold text-ocean-blue">{filteredDestinations.length}</span> destino{filteredDestinations.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-ocean-blue to-ocean-deep">
                    {destination.imageUrl ? (
                      <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Anchor className="w-20 h-20 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center text-gray-700 mb-3">
                      <Globe className="w-5 h-5 mr-2 text-ocean-blue" />
                      <span className="font-semibold">{destination.country}</span>
                      {destination.region && (
                        <span className="ml-2 px-2 py-1 bg-ocean-light text-ocean-deep text-xs rounded-full">
                          {destination.region}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-start text-gray-600 mb-3">
                      <MapPin className="w-5 h-5 mr-2 text-ocean-blue flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {destination.coordinates.latitude.toFixed(4)}°, {destination.coordinates.longitude.toFixed(4)}°
                      </span>
                    </div>

                    {destination.description && (
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {destination.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Destinations;
