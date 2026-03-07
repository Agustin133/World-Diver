import React, { useState, useEffect } from 'react';
import { MapPin, Star, Tag, Camera, Ship, Compass, Calendar, Percent, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('destinos');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/destinations?isActive=true`);
      const data = await response.json();
      setDestinations(data.destinations || []);
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const promotions = [
    {
      type: 'Viaje',
      title: 'Paquete Maldivas Todo Incluido',
      discount: '30% OFF',
      originalPrice: '$3,500',
      finalPrice: '$2,450',
      description: '7 días / 6 noches con 10 inmersiones incluidas',
      validUntil: 'Válido hasta: 30 Marzo 2026',
      icon: Ship
    },
    {
      type: 'Equipo',
      title: 'Cámara Subacuática GoPro Hero 12',
      discount: '25% OFF',
      originalPrice: '$499',
      finalPrice: '$374',
      description: 'Incluye carcasa sumergible hasta 60m y accesorios',
      validUntil: 'Válido hasta: 15 Abril 2026',
      icon: Camera
    },
    {
      type: 'Viaje',
      title: 'Expedición Raja Ampat',
      discount: '20% OFF',
      originalPrice: '$4,200',
      finalPrice: '$3,360',
      description: '10 días en liveaboard con todas las inmersiones',
      validUntil: 'Válido hasta: 20 Mayo 2026',
      icon: Compass
    },
    {
      type: 'Equipo',
      title: 'Regulador Profesional + Octopus',
      discount: '15% OFF',
      originalPrice: '$650',
      finalPrice: '$552',
      description: 'Equipo de alta gama con garantía de 2 años',
      validUntil: 'Válido hasta: 10 Abril 2026',
      icon: Tag
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="services-bubbles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="#005f73"/>
            <circle cx="60" cy="50" r="5" fill="#0a9396"/>
            <circle cx="80" cy="80" r="2" fill="#94d2bd"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#services-bubbles)" />
        </svg>
      </div>
      
      <section className="relative text-white py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/diver.jpg)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 to-ocean-blue/70"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-ocean-light max-w-2xl mx-auto mb-8">
            {t('services.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto px-4">
            <button
              onClick={() => setActiveTab('destinos')}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-full font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'destinos'
                  ? 'bg-white text-ocean-blue shadow-lg'
                  : 'bg-ocean-blue bg-opacity-50 text-white hover:bg-opacity-70'
              }`}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              {t('services.destinations')}
            </button>
            <button
              onClick={() => setActiveTab('promociones')}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-full font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'promociones'
                  ? 'bg-white text-ocean-blue shadow-lg'
                  : 'bg-ocean-blue bg-opacity-50 text-white hover:bg-opacity-70'
              }`}
            >
              <Percent className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              {t('services.promotions')}
            </button>
          </div>
        </div>
      </section>

      {activeTab === 'destinos' && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
                {t('services.featuredDestinations')}
              </h2>
              <div className="w-24 h-1 bg-ocean-blue mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('services.featuredDesc')}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue"></div>
                <p className="text-gray-600 mt-4">Cargando destinos...</p>
              </div>
            ) : destinations.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No hay destinos disponibles</p>
                <p className="text-gray-500 mt-2">Los destinos se mostrarán aquí cuando estén activos</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((destination) => (
                  <div
                    key={destination._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-ocean-blue to-ocean-deep">
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
                          <MapPin className="w-20 h-20 text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {destination.name}
                        </h3>
                        <p className="text-sm text-white flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {destination.country}
                          {destination.region && ` • ${destination.region}`}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      {destination.description && (
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                          {destination.description}
                        </p>
                      )}
                      <div className="mb-4 text-sm text-gray-500">
                        <p className="flex items-center">
                          <span className="font-semibold mr-2">Coordenadas:</span>
                          {destination.coordinates.latitude.toFixed(4)}°, {destination.coordinates.longitude.toFixed(4)}°
                        </p>
                      </div>
                      <Link
                        to="/explorar"
                        className="w-full bg-ocean-blue text-white py-2 rounded-lg font-semibold hover:bg-ocean-teal transition-colors flex items-center justify-center"
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Ver Especies en este Destino
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'promociones' && (
        <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
                Promociones y Descuentos
              </h2>
              <div className="w-24 h-1 bg-ocean-blue mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Aprovecha nuestras ofertas exclusivas en viajes y equipo de buceo
              </p>
            </div>

          <div className="grid md:grid-cols-2 gap-8">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-ocean-light border-opacity-30"
              >
                <div className="bg-gradient-to-r from-ocean-blue to-ocean-teal p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <promo.icon className="w-8 h-8 mr-3" />
                      <span className="font-semibold text-lg">{promo.type}</span>
                    </div>
                    <div className="bg-yellow-400 text-ocean-deep px-4 py-2 rounded-full font-bold text-lg">
                      {promo.discount}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-ocean-deep mb-3">
                    {promo.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {promo.description}
                  </p>
                  
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-ocean-blue">
                      {promo.finalPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {promo.originalPrice}
                    </span>
                  </div>
                  
                  <div className="bg-ocean-light bg-opacity-20 rounded-lg p-3 mb-4">
                    <p className="text-sm text-ocean-deep font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {promo.validUntil}
                    </p>
                  </div>
                  
                  <button className="w-full bg-ocean-blue text-white py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors">
                    Aprovechar Oferta
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-gradient-to-r from-ocean-deep to-ocean-blue text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-xl text-ocean-light mb-8">
            {t('services.ctaSubtitle')}
          </p>
          <Link
            to="/membresias"
            className="inline-block bg-white text-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-ocean-deep transition-colors shadow-lg"
          >
            {t('services.ctaButton')}
          </Link>
        </div>
      </section>

      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-semibold text-sm">{selectedDestination.rating}</span>
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-ocean-deep mb-2">
                {selectedDestination.name}
              </h2>
              <p className="text-gray-600 mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {selectedDestination.country}
              </p>
              
              <div className="mb-6">
                <div className="flex items-center text-ocean-blue mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Mejor época: {selectedDestination.bestMonths}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-ocean-deep mb-3">{t('services.aboutDestination')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedDestination.detailedDescription}
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-semibold text-ocean-blue mb-3">{t('services.marineLifeHighlights')}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-ocean-light bg-opacity-20 text-ocean-deep px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {t('services.close')}
                </button>
                <Link
                  to="/membresias"
                  className="flex-1 bg-ocean-blue text-white py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors text-center"
                >
                  {t('services.bookTrip')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
