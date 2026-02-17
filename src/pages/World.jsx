import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Globe, MapPin, Star, Calendar, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const World = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  const handleGoToDestinations = () => {
    navigate('/servicios');
  };

  const destinations = [
    {
      id: 1,
      name: 'Islas Maldivas',
      country: 'Maldivas',
      coordinates: [3.2028, 73.2207],
      highlights: ['Mantas Rayas', 'Tiburones Ballena', 'Arrecifes de Coral'],
      rating: 4.9,
      bestMonths: 'Nov - Abr',
      description: 'Paraíso tropical con aguas cristalinas y vida marina abundante durante todo el año.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80'
    },
    {
      id: 2,
      name: 'Gran Barrera de Coral',
      country: 'Australia',
      coordinates: [-18.2871, 147.6992],
      highlights: ['Tortugas Marinas', 'Peces Tropicales', 'Corales Únicos'],
      rating: 5.0,
      bestMonths: 'Jun - Oct',
      description: 'El sistema de arrecifes más grande del mundo, hogar de miles de especies marinas.',
      image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&q=80'
    },
    {
      id: 3,
      name: 'Galápagos',
      country: 'Ecuador',
      coordinates: [-0.9538, -90.9656],
      highlights: ['Tiburones Martillo', 'Lobos Marinos', 'Iguanas Marinas'],
      rating: 4.8,
      bestMonths: 'Dic - May',
      description: 'Biodiversidad única en el mundo, laboratorio natural de la evolución.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80'
    },
    {
      id: 4,
      name: 'Raja Ampat',
      country: 'Indonesia',
      coordinates: [-0.2353, 130.5236],
      highlights: ['Biodiversidad Extrema', 'Corales Pristinos', 'Mantas'],
      rating: 4.9,
      bestMonths: 'Oct - Abr',
      description: 'El epicentro de la biodiversidad marina mundial con más de 1,500 especies de peces.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80'
    },
    {
      id: 5,
      name: 'Playa del Carmen',
      country: 'México',
      coordinates: [20.6296, -87.0739],
      highlights: ['Tiburones Toro', 'Cenotes', 'Tortugas'],
      rating: 4.7,
      bestMonths: 'Nov - Mar',
      description: 'Combina buceo en arrecife, cenotes místicos y encuentros con tiburones toro.',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80'
    },
    {
      id: 6,
      name: 'Mar Rojo',
      country: 'Egipto',
      coordinates: [27.2579, 33.8116],
      highlights: ['Naufragios', 'Arrecifes Vibrantes', 'Delfines'],
      rating: 4.6,
      bestMonths: 'Mar - Nov',
      description: 'Aguas cálidas, visibilidad excepcional y arrecifes de coral espectaculares.',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-ocean-deep to-ocean-blue text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <Globe className="w-16 h-16 mx-auto mb-4 text-ocean-light animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mapa Mundial de Buceo
          </h1>
          <p className="text-xl text-ocean-light max-w-2xl mx-auto">
            Explora los mejores destinos de buceo alrededor del mundo
          </p>
        </div>
      </section>

      <section className="py-4 md:py-8 px-2 md:px-4 pb-0">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-[400px] md:h-[calc(100vh-250px)] md:min-h-[500px] relative">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={18}
                scrollWheelZoom={true}
                className="h-full w-full"
                style={{ zIndex: 1 }}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  noWrap={true}
                />
                {destinations.map((destination) => (
                  <Marker
                    key={destination.id}
                    position={destination.coordinates}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setSelectedDestination(destination),
                    }}
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-48 md:h-64 object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </button>
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white rounded-full px-2 md:px-3 py-1 flex items-center shadow-lg">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-semibold text-xs md:text-sm">{selectedDestination.rating}</span>
              </div>
            </div>
            
            <div className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-ocean-deep mb-2">
                {selectedDestination.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 flex items-center">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {selectedDestination.country}
              </p>
              
              <div className="mb-4 md:mb-6">
                <div className="flex items-center text-ocean-blue mb-2">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  <span className="font-semibold text-sm md:text-base">Mejor época: {selectedDestination.bestMonths}</span>
                </div>
              </div>
              
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
                {selectedDestination.description}
              </p>
              
              <div className="mb-4 md:mb-6">
                <p className="text-xs md:text-sm font-semibold text-ocean-blue mb-2 md:mb-3">Vida Marina Destacada:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-ocean-light bg-opacity-20 text-ocean-deep px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm md:text-base"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleGoToDestinations}
                  className="flex-1 bg-ocean-blue text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  Ver en Destinos
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default World;
