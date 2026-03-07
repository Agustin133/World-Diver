import React from 'react';
import { X, MapPin, Calendar, TrendingUp, Droplets, Thermometer, Eye } from 'lucide-react';

const DetailModal = ({ animal, onClose }) => {
  if (!animal) return null;

  const getMonthName = (monthNum) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthNum - 1];
  };

  const getSeasonText = () => {
    if (animal.meses_inicio <= animal.meses_fin) {
      return `${getMonthName(animal.meses_inicio)} - ${getMonthName(animal.meses_fin)}`;
    } else {
      return `${getMonthName(animal.meses_inicio)} - ${getMonthName(animal.meses_fin)}`;
    }
  };

  const getProbabilityColor = (prob) => {
    if (prob >= 80) return 'bg-green-500';
    if (prob >= 60) return 'bg-green-400';
    if (prob >= 40) return 'bg-yellow-500';
    if (prob >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={animal.imagen_url}
            alt={animal.animal}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-ocean-deep">{animal.animal}</h2>
              {animal.scientificName && (
                <p className="text-gray-600 italic text-lg mt-1">{animal.scientificName}</p>
              )}
              {animal.category && (
                <p className="text-gray-500 text-sm mt-1">{animal.category}</p>
              )}
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                animal.dificultad === 'Principiante'
                  ? 'bg-green-500 text-white'
                  : animal.dificultad === 'Intermedio'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-orange-500 text-white'
              }`}
            >
              {animal.dificultad}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2 text-ocean-blue" />
              <span className="font-medium">{animal.destino}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-ocean-blue" />
              <span className="font-medium">Temporada: {getSeasonText()}</span>
            </div>
          </div>

          {animal.probability && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-ocean-blue" />
                  <span className="font-semibold text-ocean-deep">Probabilidad de Avistamiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${getProbabilityColor(animal.probability)}`}
                      style={{ width: `${animal.probability}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-ocean-deep">{animal.probability}%</span>
                </div>
              </div>
              {animal.seasonLevel && (
                <p className="text-sm text-gray-600 mt-2">
                  Nivel de temporada: <span className="font-semibold">{animal.seasonLevel}</span>
                </p>
              )}
              {animal.logistics && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Logística:</span> {animal.logistics}
                </p>
              )}
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-ocean-deep mb-3">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{animal.descripcion}</p>
          </div>

          {animal.environmentalSpecs && (
            <div className="mb-6 grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Thermometer className="w-5 h-5 mr-2 text-ocean-blue" />
                  <h4 className="font-semibold text-ocean-deep">Temperatura del Agua</h4>
                </div>
                <p className="text-gray-700">
                  {animal.environmentalSpecs.tempRange?.min}°C - {animal.environmentalSpecs.tempRange?.max}°C
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Eye className="w-5 h-5 mr-2 text-ocean-blue" />
                  <h4 className="font-semibold text-ocean-deep">Visibilidad</h4>
                </div>
                <p className="text-gray-700">{animal.environmentalSpecs.visibility || 'Variable'}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplets className="w-5 h-5 mr-2 text-ocean-blue" />
                  <h4 className="font-semibold text-ocean-deep">Corrientes</h4>
                </div>
                <p className="text-gray-700">
                  {animal.environmentalSpecs.currents === 'Low' ? 'Bajas' : 
                   animal.environmentalSpecs.currents === 'Medium' ? 'Medias' : 'Fuertes'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 mr-2 text-ocean-blue" />
                  <h4 className="font-semibold text-ocean-deep">Profundidad</h4>
                </div>
                <p className="text-gray-700">
                  {animal.environmentalSpecs.depthRange?.min}m - {animal.environmentalSpecs.depthRange?.max}m
                </p>
              </div>
            </div>
          )}

          <div className="bg-ocean-light bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 mr-2 text-ocean-blue" />
              <h3 className="text-lg font-semibold text-ocean-deep">
                Centros de buceo recomendados
              </h3>
            </div>
            <p className="text-gray-600 italic">
              Próximamente: Lista de centros de buceo certificados en esta zona
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
