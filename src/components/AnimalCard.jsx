import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const AnimalCard = ({ animal, onClick }) => {
  const getMonthName = (monthNum) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months[monthNum - 1];
  };

  const getSeasonText = () => {
    if (animal.meses_inicio <= animal.meses_fin) {
      return `${getMonthName(animal.meses_inicio)} - ${getMonthName(animal.meses_fin)}`;
    } else {
      return `${getMonthName(animal.meses_inicio)} - ${getMonthName(animal.meses_fin)}`;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={animal.imagen_url}
          alt={animal.animal}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
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
      <div className="p-4">
        <h3 className="text-xl font-bold text-ocean-deep mb-2">{animal.animal}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{animal.destino}</span>
        </div>
        <div className="flex items-center text-ocean-blue">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{getSeasonText()}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
