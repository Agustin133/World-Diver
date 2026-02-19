import React, { useState } from 'react';
import { MapPin, Star, Tag, Camera, Ship, Compass, Calendar, Percent, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('destinos');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const featuredDestinations = [
    {
      name: 'Islas Maldivas',
      country: 'Maldivas',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      highlights: ['Mantas Rayas', 'Tiburones Ballena', 'Arrecifes de Coral', 'Tiburones de Arrecife', 'Tortugas Marinas', 'Peces Napoleón'],
      rating: 4.9,
      description: 'Paraíso tropical con aguas cristalinas y vida marina abundante durante todo el año.',
      detailedDescription: 'Las Maldivas son un paraíso tropical reconocido mundialmente por sus aguas cristalinas color turquesa y vida marina abundante. Este archipiélago ofrece algunos de los mejores sitios de buceo del mundo, con canales profundos donde se pueden observar mantas rayas gigantes y tiburones ballena. Los atolones están rodeados de arrecifes de coral vibrantes que albergan una increíble diversidad de especies. Es el destino perfecto para buceadores de todos los niveles que buscan encuentros memorables con megafauna marina.',
      bestMonths: 'Nov - Abr'
    },
    {
      name: 'Gran Barrera de Coral',
      country: 'Australia',
      image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
      highlights: ['Tortugas Marinas', 'Peces Tropicales', 'Corales Únicos', 'Tiburones de Arrecife', 'Rayas Águila', 'Peces Payaso', 'Meros Gigantes'],
      rating: 5.0,
      description: 'El sistema de arrecifes más grande del mundo, hogar de miles de especies marinas.',
      detailedDescription: 'La Gran Barrera de Coral es el sistema de arrecifes más grande del mundo y una de las siete maravillas naturales. Con más de 2,900 arrecifes individuales y 900 islas, este ecosistema alberga más de 1,500 especies de peces y 400 tipos de coral. Los buceadores pueden explorar jardines de coral prístinos, nadar con tortugas marinas verdes y carey, y observar tiburones de arrecife en su hábitat natural.',
      bestMonths: 'Jun - Oct'
    },
    {
      name: 'Galápagos',
      country: 'Ecuador',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      highlights: ['Tiburones Martillo', 'Lobos Marinos', 'Iguanas Marinas', 'Tiburones Ballena', 'Mantarrayas', 'Pingüinos de Galápagos', 'Tortugas Gigantes'],
      rating: 4.8,
      description: 'Biodiversidad única en el mundo, laboratorio natural de la evolución.',
      detailedDescription: 'Las Islas Galápagos son consideradas el laboratorio natural de la evolución y uno de los destinos de buceo más extraordinarios del planeta. Este archipiélago volcánico ofrece encuentros únicos con especies endémicas que no se encuentran en ningún otro lugar del mundo. Los buceadores pueden nadar con juguetones lobos marinos, observar grandes cardúmenes de tiburones martillo en Darwin y Wolf, y encontrarse cara a cara con iguanas marinas alimentándose bajo el agua.',
      bestMonths: 'Dic - May'
    },
    {
      name: 'Raja Ampat',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      highlights: ['Biodiversidad Extrema', 'Corales Pristinos', 'Mantas Rayas', 'Tiburones Wobbegong', 'Peces Mandarín', 'Caballitos de Mar Pigmeos', 'Nudibranquios'],
      rating: 4.9,
      description: 'El epicentro de la biodiversidad marina mundial con más de 1,500 especies de peces.',
      detailedDescription: 'Raja Ampat es reconocido como el epicentro de la biodiversidad marina mundial, albergando el 75% de todas las especies de coral conocidas y más de 1,500 especies de peces. Este archipiélago remoto en Indonesia ofrece algunos de los arrecifes de coral más prístinos y saludables del planeta. Los buceadores pueden explorar paredes verticales cubiertas de coral blando, nadar con mantas rayas en estaciones de limpieza, y descubrir criaturas macro únicas.',
      bestMonths: 'Oct - Abr'
    },
    {
      name: 'Playa del Carmen',
      country: 'México',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
      highlights: ['Tiburones Toro', 'Cenotes', 'Tortugas Marinas', 'Peces Ángel', 'Barracudas', 'Rayas del Sur', 'Morenas'],
      rating: 4.7,
      description: 'Combina buceo en arrecife, cenotes místicos y encuentros con tiburones toro.',
      detailedDescription: 'Playa del Carmen ofrece una experiencia de buceo única que combina arrecifes caribeños, cenotes místicos de agua dulce y emocionantes encuentros con tiburones toro. La Riviera Maya es famosa por sus cenotes, cavernas subterráneas con aguas cristalinas donde los rayos de luz crean efectos visuales espectaculares. Durante el invierno, los buceadores experimentados pueden sumergirse con tiburones toro hembra que llegan a la zona.',
      bestMonths: 'Nov - Mar'
    },
    {
      name: 'Mar Rojo',
      country: 'Egipto',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
      highlights: ['Naufragios Históricos', 'Arrecifes Vibrantes', 'Delfines', 'Tiburones Oceánicos', 'Peces Napoleón', 'Tortugas Carey', 'Barracudas'],
      rating: 4.6,
      description: 'Aguas cálidas, visibilidad excepcional y arrecifes de coral espectaculares.',
      detailedDescription: 'El Mar Rojo es uno de los destinos de buceo más accesibles y espectaculares del mundo, famoso por sus aguas cálidas, visibilidad excepcional que puede superar los 30 metros, y arrecifes de coral vibrantes. La región ofrece una combinación única de buceo en arrecife y exploración de naufragios históricos como el SS Thistlegorm. Los buceadores pueden encontrarse con delfines juguetones, tiburones oceánicos de punta blanca, y una increíble variedad de peces tropicales.',
      bestMonths: 'Mar - Nov'
    }
  ];

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold text-sm">{destination.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-ocean-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {destination.bestMonths}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-ocean-deep mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {destination.country}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {destination.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-ocean-blue mb-2">Vida Marina Destacada:</p>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-ocean-light bg-opacity-20 text-ocean-deep px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDestination(destination)}
                    className="w-full bg-ocean-blue text-white py-2 rounded-lg font-semibold hover:bg-ocean-teal transition-colors flex items-center justify-center"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    {t('services.viewDetails')}
                  </button>
                </div>
              </div>
            ))}
            </div>
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
