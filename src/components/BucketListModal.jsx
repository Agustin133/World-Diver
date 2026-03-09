import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, DollarSign, CheckCircle, Circle, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BucketListModal = ({ isOpen, onClose, onItemDeleted }) => {
  const { isAuthenticated } = useAuth();
  const [bucketList, setBucketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchBucketList();
    }
  }, [isOpen, isAuthenticated]);

  const fetchBucketList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bucketlist`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setBucketList(data.items || []);
    } catch (error) {
      console.error('Error fetching bucket list:', error);
    } finally {
      setLoading(false);
    }
  };

  const addChecklistItem = async (itemId) => {
    if (!newChecklistItem.trim()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bucketlist/${itemId}/checklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ item: newChecklistItem })
      });

      if (response.ok) {
        setNewChecklistItem('');
        fetchBucketList();
      }
    } catch (error) {
      console.error('Error adding checklist item:', error);
    }
  };

  const toggleChecklistItem = async (itemId, checklistId, completed) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/bucketlist/${itemId}/checklist/${checklistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ completed: !completed })
      });
      fetchBucketList();
    } catch (error) {
      console.error('Error toggling checklist item:', error);
    }
  };

  const addQuestion = async (itemId) => {
    if (!newQuestion.trim()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bucketlist/${itemId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ question: newQuestion })
      });

      if (response.ok) {
        setNewQuestion('');
        fetchBucketList();
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const removeFromBucketList = async (itemId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/bucketlist/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchBucketList();
      if (selectedItem?._id === itemId) {
        setSelectedItem(null);
      }
      // Notificar a World.jsx para que recargue los pines del mapa
      if (onItemDeleted) {
        onItemDeleted();
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-ocean-deep mb-4">Inicia Sesión</h2>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión para acceder a tu Bucket List
          </p>
          <button
            onClick={onClose}
            className="w-full bg-ocean-blue text-white py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex">
        {/* Lista de destinos */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-ocean-deep to-ocean-blue p-4 text-white">
            <h2 className="text-xl font-bold">Mi Bucket List</h2>
            <p className="text-sm text-ocean-light">{bucketList.length} destinos</p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-blue"></div>
            </div>
          ) : bucketList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Trash2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Tu bucket list está vacío</p>
              <p className="text-sm mt-2">Agrega destinos desde el mapa</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bucketList.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedItem?._id === item._id ? 'bg-ocean-light bg-opacity-20' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.destination?.name || item.destinationData?.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.destination?.country || item.destinationData?.country}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalle del destino */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-ocean-deep">
              {selectedItem ? (selectedItem.destination?.name || selectedItem.destinationData?.name) : 'Selecciona un destino'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedItem ? (
              <div className="space-y-6">
                {/* Información básica */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedItem.targetDate && (
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-ocean-blue" />
                      <div>
                        <p className="text-xs text-gray-500">Fecha objetivo</p>
                        <p className="font-semibold">{new Date(selectedItem.targetDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  {selectedItem.budget?.estimated && (
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="w-5 h-5 mr-2 text-ocean-blue" />
                      <div>
                        <p className="text-xs text-gray-500">Presupuesto estimado</p>
                        <p className="font-semibold">${selectedItem.budget.estimated} {selectedItem.budget.currency}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notas */}
                {selectedItem.notes && (
                  <div>
                    <h3 className="font-semibold text-ocean-deep mb-2">Notas personales</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedItem.notes}</p>
                  </div>
                )}

                {/* Checklist */}
                <div>
                  <h3 className="font-semibold text-ocean-deep mb-3">Checklist de preparación</h3>
                  <div className="space-y-2 mb-3">
                    {selectedItem.checklist?.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => toggleChecklistItem(selectedItem._id, item._id, item.completed)}
                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        {item.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 mr-2" />
                        )}
                        <span className={item.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      placeholder="Agregar item al checklist..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addChecklistItem(selectedItem._id)}
                    />
                    <button
                      onClick={() => addChecklistItem(selectedItem._id)}
                      className="px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean-teal transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Preguntas */}
                <div>
                  <h3 className="font-semibold text-ocean-deep mb-3">Preguntas y dudas</h3>
                  <div className="space-y-3 mb-3">
                    {selectedItem.questions?.map((q) => (
                      <div key={q._id} className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-start">
                          <MessageCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-gray-800">{q.question}</p>
                            {q.answer && (
                              <p className="text-sm text-gray-600 mt-2 pl-4 border-l-2 border-blue-300">
                                {q.answer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Agregar pregunta..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addQuestion(selectedItem._id)}
                    />
                    <button
                      onClick={() => addQuestion(selectedItem._id)}
                      className="px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean-teal transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => removeFromBucketList(selectedItem._id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Eliminar de Bucket List
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p>Selecciona un destino para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BucketListModal;
