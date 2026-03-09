import React, { useState } from 'react';
import { MapPin, Star, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const MapLegend = ({ onPinSelect, selectedPinType }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const legendItems = [
    {
      id: 'places',
      icon: MapPin,
      color: 'blue',
      bgColor: 'bg-blue-500',
      label: 'Lugares',
      description: 'Destinos disponibles',
      clickable: false
    },
    {
      id: 'visited',
      icon: MapPin,
      color: 'red',
      bgColor: 'bg-red-500',
      label: 'Estuve',
      description: 'Lugares visitados',
      clickable: true,
      draggable: false
    },
    {
      id: 'wishlist',
      icon: MapPin,
      color: 'green',
      bgColor: 'bg-green-500',
      label: 'Deseado',
      description: 'Lista de deseos',
      clickable: true,
      draggable: false
    },
    {
      id: 'bucket',
      icon: Trash2,
      color: 'yellow',
      bgColor: 'bg-yellow-500',
      label: 'Bucket List',
      description: 'Ver mi bucket list',
      clickable: true
    }
  ];

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 right-0 z-[1000] transition-all duration-300 ease-in-out ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Botón de colapsar/expandir - siempre visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 bg-ocean-blue text-white rounded-l-lg shadow-lg p-3 hover:bg-ocean-teal transition-all duration-300 ${
          isExpanded ? '-translate-x-full' : '-translate-x-full'
        }`}
        style={{ left: isExpanded ? '0' : '-48px' }}
      >
        {isExpanded ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* Contenido de la leyenda */}
      <div className="bg-white rounded-l-lg shadow-2xl p-4 w-80 max-h-[80vh] overflow-y-auto border-l-4 border-ocean-blue">
        <h3 className="text-lg font-bold text-ocean-deep mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Leyenda del Mapa
        </h3>
        
        <div className="space-y-2">
          {legendItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPinType === item.id;
            
            return (
              <div
                key={item.id}
                onClick={() => item.clickable && onPinSelect && onPinSelect(item.id)}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  item.clickable 
                    ? 'cursor-pointer hover:bg-gray-50 hover:shadow-md' 
                    : 'cursor-default bg-gray-50'
                } ${
                  isSelected ? 'bg-ocean-light bg-opacity-20 ring-2 ring-ocean-blue shadow-md' : ''
                }`}
              >
                <div className={`${item.bgColor} rounded-full p-2 mr-3 flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                  {isSelected && item.clickable && item.id !== 'bucket' && (
                    <p className="text-xs text-ocean-blue mt-1 font-medium">
                      ✓ Activo - Click en destino
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Instrucciones:</strong>
          </p>
          <ul className="text-xs text-gray-600 mt-2 space-y-1">
            <li>• Click en pin rojo/verde para activar</li>
            <li>• Click en destino azul para colocar</li>
            <li>• Pin verde agrega a bucket list</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
