import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Star, Calendar, X, ArrowRight, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import MapLegend from '../components/MapLegend';
import BucketListModal from '../components/BucketListModal';
import CollaborativeSpace from '../components/CollaborativeSpace';
import 'leaflet/dist/leaflet.css';

const World = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedPinType, setSelectedPinType] = useState(null);
  const [userPlaces, setUserPlaces] = useState({ visited: [], wishlist: [] });
  const [showBucketList, setShowBucketList] = useState(false);
  const [showCollaborative, setShowCollaborative] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });

  const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleGoToDestinations = () => {
    navigate('/servicios');
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserPlaces();
    }
  }, [isAuthenticated]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/destinations`);
      const data = await response.json();
      setDestinations(data.destinations || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPlaces = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user-places/my-places`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      const visited = data.places?.filter(p => p.type === 'visited') || [];
      const wishlist = data.places?.filter(p => p.type === 'wishlist') || [];
      
      setUserPlaces({ visited, wishlist });
    } catch (error) {
      console.error('Error fetching user places:', error);
    }
  };

  const handlePinSelect = (pinType) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (pinType === 'bucket') {
      setShowBucketList(true);
      setSelectedPinType(null);
    } else {
      setSelectedPinType(selectedPinType === pinType ? null : pinType);
    }
  };

  const handleDeleteUserPlace = async (placeId) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user-places/${placeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchUserPlaces();
        setSelectedDestination(null);
      }
    } catch (error) {
      console.error('Error deleting user place:', error);
    }
  };

  const handleAddUserPlace = async (destination, latlng) => {
    if (!selectedPinType || !isAuthenticated) return;

    try {
      const isValidObjectId = destination && destination._id && destination._id.length === 24;
      
      const requestBody = {
        type: selectedPinType,
        coordinates: {
          latitude: latlng.lat,
          longitude: latlng.lng
        }
      };

      if (isValidObjectId) {
        requestBody.destination = destination._id;
      } else {
        // Para ubicaciones personalizadas o destinos sin ObjectId válido
        requestBody.destinationData = {
          _id: destination?._id || `custom-${Date.now()}`,
          name: destination?.name || 'Ubicación personalizada',
          country: destination?.country || 'Ubicación en mapa',
          imageUrl: destination?.imageUrl || destination?.image || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80'
        };
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/user-places`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        fetchUserPlaces();
        setSelectedPinType(null);
        
        if (selectedPinType === 'wishlist') {
          const bucketBody = isValidObjectId 
            ? { destination: destination._id, priority: 'medium' }
            : { destinationData: requestBody.destinationData, priority: 'medium' };

          await fetch(`${process.env.REACT_APP_API_URL}/bucketlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(bucketBody)
          }).catch(err => console.log('Bucket list error:', err));
        }
      }
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        if (selectedPinType) {
          // Usar geocoding reverso para obtener el nombre del lugar
          let locationName = 'Ubicación personalizada';
          let countryName = 'Ubicación en mapa';
          
          try {
            // Usar Nominatim (OpenStreetMap) para geocoding reverso
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'WorldDivers/1.0'
                }
              }
            );
            const data = await response.json();
            
            if (data && data.address) {
              // Intentar obtener el nombre más específico disponible
              locationName = data.address.city || 
                           data.address.town || 
                           data.address.village || 
                           data.address.state || 
                           data.display_name?.split(',')[0] || 
                           'Ubicación personalizada';
              
              countryName = data.address.country || 'Ubicación en mapa';
            }
          } catch (error) {
            console.log('Geocoding error, using default name:', error);
          }
          
          const tempDestination = {
            _id: `temp-${Date.now()}`,
            name: locationName,
            country: countryName,
            coordinates: {
              latitude: e.latlng.lat,
              longitude: e.latlng.lng
            }
          };
          handleAddUserPlace(tempDestination, e.latlng);
        }
      }
    });
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="relative text-white py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/coral.jpg)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 to-ocean-blue/70"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <Globe className="w-16 h-16 mx-auto mb-4 text-ocean-light animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('world.title')}
          </h1>
          <p className="text-xl text-ocean-light max-w-2xl mx-auto">
            {t('world.subtitle')}
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
                <MapClickHandler />
                
                {userPlaces.visited.map((place) => (
                  <Marker
                    key={`visited-${place._id}`}
                    position={[place.coordinates.latitude, place.coordinates.longitude]}
                    icon={redIcon}
                    eventHandlers={{
                      click: () => {
                        const fullDestination = destinations.find(d => 
                          d._id === place.destination?._id || 
                          d._id === place.destinationData?._id
                        );
                        const destinationToShow = fullDestination || place.destination || place.destinationData;
                        // Agregar el ID del UserPlace para poder eliminarlo
                        setSelectedDestination({
                          ...destinationToShow,
                          userPlaceId: place._id,
                          userPlaceType: 'visited'
                        });
                        setShowCollaborative(false);
                      },
                    }}
                  />
                ))}
                
                {userPlaces.wishlist.map((place) => (
                  <Marker
                    key={`wishlist-${place._id}`}
                    position={[place.coordinates.latitude, place.coordinates.longitude]}
                    icon={greenIcon}
                    eventHandlers={{
                      click: () => {
                        const fullDestination = destinations.find(d => 
                          d._id === place.destination?._id || 
                          d._id === place.destinationData?._id
                        );
                        const destinationToShow = fullDestination || place.destination || place.destinationData;
                        // Agregar el ID del UserPlace para poder eliminarlo
                        setSelectedDestination({
                          ...destinationToShow,
                          userPlaceId: place._id,
                          userPlaceType: 'wishlist'
                        });
                        setShowCollaborative(false);
                      },
                    }}
                  />
                ))}
                {!loading && destinations.map((destination) => (
                  <Marker
                    key={destination._id}
                    position={[destination.coordinates.latitude, destination.coordinates.longitude]}
                    icon={blueIcon}
                    eventHandlers={{
                      click: (e) => {
                        e.originalEvent.stopPropagation();
                        if (!selectedPinType) {
                          // Solo abrir modal si NO hay un tipo de pin seleccionado
                          setSelectedDestination(destination);
                          setShowCollaborative(false);
                        }
                        // Si hay pin seleccionado, no hacer nada (el MapClickHandler se encargará)
                      },
                    }}
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
        
        <MapLegend 
          onPinSelect={handlePinSelect}
          selectedPinType={selectedPinType}
        />
      </section>

      <BucketListModal 
        isOpen={showBucketList}
        onClose={() => setShowBucketList(false)}
        onItemDeleted={fetchUserPlaces}
      />

      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedDestination.imageUrl || selectedDestination.image || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80'}
                alt={selectedDestination.name}
                className="w-full h-48 md:h-64 object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </button>
              {selectedDestination.rating && (
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white rounded-full px-2 md:px-3 py-1 flex items-center shadow-lg">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold text-xs md:text-sm">{selectedDestination.rating}</span>
                </div>
              )}
            </div>
            
            <div className="p-4 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-ocean-deep mb-2">
                {selectedDestination.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 flex items-center">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {selectedDestination.country}
              </p>
              
              <p className="text-gray-600 mb-4">
                {t('world.description')}
              </p>
              
              {selectedDestination.bestMonths && (
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center text-ocean-blue mb-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    <span className="font-semibold text-sm md:text-base">Mejor época: {selectedDestination.bestMonths}</span>
                  </div>
                </div>
              )}
              
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
                {selectedDestination.description}
              </p>
              
              <div className="mb-4">
                <div className="flex gap-2 border-b border-gray-200">
                  <button
                    onClick={() => setShowCollaborative(false)}
                    className={`px-4 py-2 font-semibold transition-colors ${
                      !showCollaborative
                        ? 'text-ocean-blue border-b-2 border-ocean-blue'
                        : 'text-gray-600 hover:text-ocean-blue'
                    }`}
                  >
                    Información
                  </button>
                  {/* Solo mostrar tab colaborativo si es un destino real de la BD (ObjectId válido) */}
                  {selectedDestination._id && selectedDestination._id.length === 24 && !selectedDestination._id.startsWith('temp-') && (
                    <button
                      onClick={() => setShowCollaborative(true)}
                      className={`px-4 py-2 font-semibold transition-colors ${
                        showCollaborative
                          ? 'text-ocean-blue border-b-2 border-ocean-blue'
                          : 'text-gray-600 hover:text-ocean-blue'
                      }`}
                    >
                      Espacio Colaborativo
                    </button>
                  )}
                </div>
              </div>

              {showCollaborative && selectedDestination._id && selectedDestination._id.length === 24 && !selectedDestination._id.startsWith('temp-') ? (
                <CollaborativeSpace destination={selectedDestination} />
              ) : (
                <>
                  {selectedDestination.highlights && selectedDestination.highlights.length > 0 && (
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
                  )}
                </>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4">
                {selectedDestination.userPlaceId && (
                  <button
                    onClick={() => handleDeleteUserPlace(selectedDestination.userPlaceId)}
                    className="flex-1 bg-red-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm md:text-base flex items-center justify-center"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Eliminar Pin
                  </button>
                )}
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm md:text-base"
                >
                  {t('services.close')}
                </button>
                <button
                  onClick={handleGoToDestinations}
                  className="flex-1 bg-ocean-blue text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  {t('world.viewInDestinations')}
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
