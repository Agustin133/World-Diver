import React, { useState } from 'react';
import { MapPin, Star, Tag, Camera, Ship, Compass, Calendar, Percent } from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('destinos');
  const featuredDestinations = [
    {
      name: 'Islas Maldivas',
      country: 'Maldivas',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      highlights: ['Mantas Rayas', 'Tiburones Ballena', 'Arrecifes de Coral'],
      rating: 4.9,
      description: 'Paraíso tropical con aguas cristalinas y vida marina abundante durante todo el año.',
      bestMonths: 'Nov - Abr'
    },
    {
      name: 'Gran Barrera de Coral',
      country: 'Australia',
      image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
      highlights: ['Tortugas Marinas', 'Peces Tropicales', 'Corales Únicos'],
      rating: 5.0,
      description: 'El sistema de arrecifes más grande del mundo, hogar de miles de especies marinas.',
      bestMonths: 'Jun - Oct'
    },
    {
      name: 'Galápagos',
      country: 'Ecuador',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      highlights: ['Tiburones Martillo', 'Lobos Marinos', 'Iguanas Marinas'],
      rating: 4.8,
      description: 'Biodiversidad única en el mundo, laboratorio natural de la evolución.',
      bestMonths: 'Dic - May'
    },
    {
      name: 'Raja Ampat',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      highlights: ['Biodiversidad Extrema', 'Corales Pristinos', 'Mantas'],
      rating: 4.9,
      description: 'El epicentro de la biodiversidad marina mundial con más de 1,500 especies de peces.',
      bestMonths: 'Oct - Abr'
    },
    {
      name: 'Playa del Carmen',
      country: 'México',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
      highlights: ['Tiburones Toro', 'Cenotes', 'Tortugas'],
      rating: 4.7,
      description: 'Combina buceo en arrecife, cenotes místicos y encuentros con tiburones toro.',
      bestMonths: 'Nov - Mar'
    },
    {
      name: 'Mar Rojo',
      country: 'Egipto',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
      highlights: ['Naufragios', 'Arrecifes Vibrantes', 'Delfines'],
      rating: 4.6,
      description: 'Aguas cálidas, visibilidad excepcional y arrecifes de coral espectaculares.',
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
      
      <section className="bg-gradient-to-r from-ocean-deep to-ocean-blue text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Servicios World Divers
          </h1>
          <p className="text-xl text-ocean-light max-w-2xl mx-auto mb-8">
            Descubre destinos increíbles y aprovecha nuestras promociones exclusivas
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
              Destinos
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
              Promociones
            </button>
          </div>
        </div>
      </section>

      {activeTab === 'destinos' && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
                Destinos Destacados
              </h2>
              <div className="w-24 h-1 bg-ocean-blue mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Los mejores lugares del mundo para experiencias de buceo inolvidables
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
                  <button className="w-full bg-ocean-blue text-white py-2 rounded-lg font-semibold hover:bg-ocean-teal transition-colors">
                    Ver Más Detalles
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
            ¿Listo para tu próxima aventura submarina?
          </h2>
          <p className="text-xl text-ocean-light mb-8">
            Únete a miles de buceadores que ya planifican sus viajes con Marine Season Tracker
          </p>
          <button className="bg-white text-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-ocean-deep transition-colors shadow-lg">
            Comenzar Ahora
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
