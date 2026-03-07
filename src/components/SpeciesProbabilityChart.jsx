import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const SpeciesProbabilityChart = ({ occurrences }) => {
  if (!occurrences || occurrences.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600">
        No hay datos de probabilidad disponibles
      </div>
    );
  }

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };

  const monthlyData = Array(12).fill(null).map(() => ({
    maxProbability: 0,
    destinations: []
  }));

  occurrences.forEach(occurrence => {
    occurrence.months.forEach(month => {
      const monthIndex = monthMap[month];
      if (monthIndex !== undefined) {
        if (occurrence.probability > monthlyData[monthIndex].maxProbability) {
          monthlyData[monthIndex].maxProbability = occurrence.probability;
        }
        monthlyData[monthIndex].destinations.push({
          name: occurrence.destination?.name || 'Destino desconocido',
          country: occurrence.destination?.country || '',
          probability: occurrence.probability,
          seasonLevel: occurrence.seasonLevel
        });
      }
    });
  });

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'bg-green-600';
    if (probability >= 60) return 'bg-green-400';
    if (probability >= 40) return 'bg-yellow-500';
    if (probability >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSeasonLevelColor = (level) => {
    if (level === 'High') return 'text-green-600';
    if (level === 'Medium') return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-ocean-deep mb-4">
        Probabilidad de Avistamiento por Mes
      </h3>
      
      <div className="grid grid-cols-12 gap-2">
        {months.map((month, index) => {
          const data = monthlyData[index];
          const hasData = data.maxProbability > 0;
          
          return (
            <div key={month} className="flex flex-col items-center">
              <div className="relative w-full h-32 bg-gray-100 rounded-t-lg overflow-hidden group">
                {hasData && (
                  <>
                    <div
                      className={`absolute bottom-0 w-full ${getProbabilityColor(data.maxProbability)} transition-all`}
                      style={{ height: `${data.maxProbability}%` }}
                    ></div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-white text-center p-2 max-h-full overflow-y-auto">
                        <p className="font-bold text-sm mb-1">{data.maxProbability}%</p>
                        {data.destinations.map((dest, idx) => (
                          <div key={idx} className="text-xs mb-1">
                            <p className="font-semibold">{dest.name}</p>
                            <p>{dest.country}</p>
                            <p className={getSeasonLevelColor(dest.seasonLevel)}>
                              {dest.seasonLevel}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="text-xs font-medium text-gray-600 mt-1">{month}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-ocean-deep mb-2">Destinos por Temporada</h4>
        <div className="space-y-2">
          {occurrences.map((occurrence, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-ocean-blue flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">
                  {occurrence.destination?.name || 'Destino desconocido'}, {occurrence.destination?.country || ''}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{occurrence.months.join(', ')}</span>
                  <span className="ml-2">•</span>
                  <span className="font-semibold">{occurrence.probability}%</span>
                  <span className="ml-2">•</span>
                  <span className={getSeasonLevelColor(occurrence.seasonLevel)}>
                    {occurrence.seasonLevel}
                  </span>
                </div>
                {occurrence.logistics && (
                  <p className="text-xs text-gray-600 mt-1">{occurrence.logistics}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span>80-100%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span>60-79%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>40-59%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>20-39%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>0-19%</span>
        </div>
      </div>
    </div>
  );
};

export default SpeciesProbabilityChart;
