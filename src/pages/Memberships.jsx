import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Crown, Building2, Sparkles } from 'lucide-react';

const Memberships = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/memberships/plans`);
      const data = await response.json();
      setPlans(data.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleSubscribe = async (planId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (planId === 'free') {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/memberships/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: planId })
      });

      if (response.ok) {
        alert('¡Suscripción exitosa! Tu plan ha sido activado.');
        window.location.reload();
      } else {
        alert('Error al procesar la suscripción');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (planId) => {
    switch(planId) {
      case 'free':
        return Sparkles;
      case 'pro':
        return Crown;
      case 'dive-center':
        return Building2;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-ocean-deep mb-4">
            Elige tu Plan de Membresía
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desbloquea funciones exclusivas y lleva tu experiencia de buceo al siguiente nivel
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = getPlanIcon(plan.id);
            const isCurrentPlan = user?.membershipPlan === plan.id;
            const isPro = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  isPro ? 'ring-4 ring-ocean-blue transform scale-105' : ''
                }`}
              >
                {isPro && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    MÁS POPULAR
                  </div>
                )}

                <div className={`p-8 ${isPro ? 'bg-gradient-to-br from-ocean-blue to-ocean-teal text-white' : 'bg-gray-50'}`}>
                  <Icon className={`w-12 h-12 mb-4 ${isPro ? 'text-white' : 'text-ocean-blue'}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${isPro ? 'text-white' : 'text-ocean-deep'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-2">
                    <span className={`text-4xl font-bold ${isPro ? 'text-white' : 'text-ocean-deep'}`}>
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className={`ml-2 ${isPro ? 'text-ocean-light' : 'text-gray-600'}`}>
                        /{plan.duration.toLowerCase()}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${isPro ? 'text-ocean-light' : 'text-gray-600'}`}>
                    {plan.duration}
                  </p>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Plan Actual
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={loading || plan.id === 'free'}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        isPro
                          ? 'bg-ocean-blue text-white hover:bg-ocean-teal'
                          : plan.id === 'free'
                          ? 'bg-gray-200 text-gray-600 cursor-default'
                          : 'bg-ocean-blue text-white hover:bg-ocean-teal'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {plan.id === 'free' ? 'Plan Gratuito' : loading ? 'Procesando...' : 'Suscribirse'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!isAuthenticated && (
          <div className="mt-12 text-center bg-ocean-light bg-opacity-20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-ocean-deep mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-gray-700 mb-6">
              Crea una cuenta gratuita para acceder a todas las funciones básicas
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-ocean-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors"
            >
              Crear Cuenta Gratis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memberships;
