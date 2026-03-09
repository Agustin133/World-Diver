import React, { useState } from 'react';
import { MapPin, Star, Tag, Camera, Ship, Compass, Calendar, Percent, X, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import MembershipRequiredModal from '../components/MembershipRequiredModal';

const Benefits = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('promociones');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const handleClaimOffer = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowMembershipModal(true);
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
            Beneficios Exclusivos
          </h1>
          <p className="text-xl text-ocean-light max-w-2xl mx-auto mb-8">
            Descubre promociones únicas y servicios especiales para miembros de World Divers
          </p>
          
          <div className="flex justify-center">
            <div className="inline-flex bg-white bg-opacity-20 rounded-full p-1">
              <button
                onClick={() => setActiveTab('promociones')}
                className={`py-3 px-6 rounded-full font-semibold transition-all ${
                  activeTab === 'promociones'
                    ? 'bg-white text-ocean-blue shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Percent className="w-5 h-5 inline mr-2" />
                Promociones
              </button>
              <button
                onClick={() => setActiveTab('servicios')}
                className={`py-3 px-6 rounded-full font-semibold transition-all ${
                  activeTab === 'servicios'
                    ? 'bg-white text-ocean-blue shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <MapPin className="w-5 h-5 inline mr-2" />
                Servicios
              </button>
            </div>
          </div>
        </div>
      </section>

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
                  
                  <button 
                    onClick={handleClaimOffer}
                    className="w-full bg-ocean-blue text-white py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors"
                  >
                    Aprovechar Oferta
                  </button>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'servicios' && (
        <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-4">
                Servicios Adicionales
              </h2>
              <div className="w-24 h-1 bg-ocean-blue mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Próximamente tendrás acceso a servicios exclusivos para mejorar tu experiencia de buceo
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Paquetes y Excursiones', icon: Ship, color: 'blue' },
                { title: 'Accesorios de Viaje', icon: Tag, color: 'green' },
                { title: 'Certificaciones de Buceo', icon: Star, color: 'purple' },
                { title: 'Trajes de Baño', icon: Compass, color: 'pink' },
                { title: 'Equipos de Buceo', icon: Camera, color: 'indigo' },
                { title: 'Seguros de Viaje', icon: MapPin, color: 'orange' },
                { title: 'Seguros de Buceo', icon: Info, color: 'teal' }
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 bg-${service.color}-100 rounded-full flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 text-${service.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-ocean-deep mb-3">
                      {service.title}
                    </h3>
                    <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full mb-3">
                      Próximamente
                    </span>
                    <p className="text-gray-600 text-sm">
                      Este servicio estará disponible muy pronto para todos nuestros miembros
                    </p>
                  </div>
                );
              })}
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

      <MembershipRequiredModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />

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

export default Benefits;
