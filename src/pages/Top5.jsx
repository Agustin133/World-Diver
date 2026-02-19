import React, { useState } from 'react';
import { Trophy, MapPin, Calendar, Info } from 'lucide-react';
import DetailModal from '../components/DetailModal';
import animalsData from '../data.json';
import { useLanguage } from '../context/LanguageContext';

const Top5 = () => {
  const { t } = useLanguage();
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const topAnimals = animalsData.slice(0, 5);

  const getMonthName = (monthNum) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months[monthNum - 1];
  };

  const getSeasonText = (animal) => {
    if (animal.meses_inicio <= animal.meses_fin) {
      return `${getMonthName(animal.meses_inicio)} - ${getMonthName(animal.meses_fin)}`;
    } else {
      return `${getMonthName(animal.meses_inicio)} - ${getMonthName(animal.meses_fin)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-ocean-light to-opacity-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 border-4 border-ocean-blue rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 border-4 border-ocean-teal rounded-full"></div>
      </div>
      <section className="relative text-white py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/delfines.jfif)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 to-ocean-blue/70"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Top 5 Animales Marinos
          </h1>
          <p className="text-xl text-ocean-light max-w-2xl mx-auto">
            Los encuentros más espectaculares y buscados por buceadores de todo el mundo
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {topAnimals.map((animal, index) => (
              <div
                key={animal.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={animal.imagen_url}
                      alt={animal.animal}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-ocean-deep rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                      #{index + 1}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          animal.dificultad === 'Principiante'
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-500 text-white'
                        }`}
                      >
                        {animal.dificultad}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-ocean-deep mb-4">
                        {animal.animal}
                      </h2>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-5 h-5 mr-2 text-ocean-blue flex-shrink-0" />
                          <span className="font-medium">{animal.destino}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Calendar className="w-5 h-5 mr-2 text-ocean-blue flex-shrink-0" />
                          <span className="font-medium">Mejor época: {getSeasonText(animal)}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {animal.descripcion}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedAnimal(animal)}
                      className="mt-6 inline-flex items-center justify-center bg-ocean-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors"
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Ver Detalles Completos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-ocean-blue to-ocean-teal rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Por qué estos 5?</h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Estos encuentros han sido seleccionados por su espectacularidad, accesibilidad y el impacto positivo que generan en la conservación marina. Cada uno representa una experiencia única que todo buceador debería vivir al menos una vez.
            </p>
          </div>
        </div>
      </section>

      {selectedAnimal && (
        <DetailModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
};

export default Top5;
