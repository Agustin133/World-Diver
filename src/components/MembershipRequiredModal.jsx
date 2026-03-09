import React from 'react';
import { Link } from 'react-router-dom';
import { X, Crown, Check } from 'lucide-react';

const MembershipRequiredModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Plan Regular',
      price: '$9.99',
      period: '/mes',
      features: [
        'Acceso a promociones exclusivas',
        'Descuentos en equipos de buceo',
        'Newsletter mensual',
        'Comunidad de buceadores'
      ],
      color: 'ocean-blue',
      recommended: false
    },
    {
      name: 'Plan Premium',
      price: '$19.99',
      period: '/mes',
      features: [
        'Todo lo del Plan Regular',
        'Descuentos adicionales del 20%',
        'Acceso prioritario a eventos',
        'Asesoría personalizada',
        'Contenido exclusivo'
      ],
      color: 'yellow-500',
      recommended: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-ocean-deep to-ocean-blue p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-2">Acceso Exclusivo para Miembros</h2>
            <p className="text-ocean-light text-lg">
              Para acceder a nuestras únicas e increíbles promociones selecciona alguno de nuestros planes de suscripción
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-6 border-2 transition-all ${
                  plan.recommended
                    ? 'border-yellow-500 shadow-xl scale-105'
                    : 'border-gray-200 hover:border-ocean-blue'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Recomendado
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-ocean-deep mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-ocean-blue">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/membresias"
                  onClick={onClose}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${
                    plan.recommended
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-ocean-blue text-white hover:bg-ocean-teal'
                  }`}
                >
                  Seleccionar Plan
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              ¿Ya tienes una cuenta? <Link to="/login" onClick={onClose} className="text-ocean-blue font-semibold hover:underline">Inicia sesión aquí</Link>
            </p>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Continuar sin suscripción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipRequiredModal;
