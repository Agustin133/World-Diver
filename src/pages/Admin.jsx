import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Save, Trash2, Eye, EyeOff, Search, MapPin, Globe, Edit } from 'lucide-react';
import SpeciesProbabilityChart from '../components/SpeciesProbabilityChart';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('species');
  const [species, setSpecies] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    commonName: '',
    scientificName: '',
    category: '',
    difficulty: 'Principiante',
    description: '',
    imageUrl: '',
    occurrences: [],
    environmentalSpecs: {
      tempRange: { min: 0, max: 30 },
      visibility: '',
      currents: 'Low',
      depthRange: { min: 0, max: 40 }
    },
    metadata: {
      trustScore: 50,
      sources: []
    },
    status: 'draft'
  });

  const [newOccurrence, setNewOccurrence] = useState({
    destination: '',
    months: [],
    probability: 50,
    seasonLevel: 'Medium',
    logistics: ''
  });

  const [showDestForm, setShowDestForm] = useState(false);
  const [editingDestId, setEditingDestId] = useState(null);
  const [destSearchTerm, setDestSearchTerm] = useState('');
  const [destFormData, setDestFormData] = useState({
    name: '',
    country: '',
    region: '',
    coordinates: { latitude: 0, longitude: 0 },
    description: '',
    imageUrl: '',
    isActive: true
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchSpecies();
    fetchDestinations();
  }, [user, navigate]);

  const fetchSpecies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/species?status=all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSpecies(data.species || []);
    } catch (err) {
      console.error('Error fetching species:', err);
    }
  };

  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/destinations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setDestinations(data.destinations || []);
    } catch (err) {
      console.error('Error fetching destinations:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const url = editingId 
        ? `${process.env.REACT_APP_API_URL}/species/${editingId}`
        : `${process.env.REACT_APP_API_URL}/species`;
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error del servidor:', data);
        const errorMsg = data.errors 
          ? data.errors.map(e => e.msg).join(', ')
          : data.message || 'Error al guardar la especie';
        throw new Error(errorMsg);
      }

      setSuccess(editingId ? 'Especie actualizada exitosamente' : 'Especie creada exitosamente');
      resetForm();
      fetchSpecies();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      commonName: '',
      scientificName: '',
      category: '',
      difficulty: 'Principiante',
      description: '',
      imageUrl: '',
      occurrences: [],
      environmentalSpecs: {
        tempRange: { min: 0, max: 30 },
        visibility: '',
        currents: 'Low',
        depthRange: { min: 0, max: 40 }
      },
      metadata: {
        trustScore: 50,
        sources: []
      },
      status: 'draft'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (speciesItem) => {
    setFormData({
      commonName: speciesItem.commonName,
      scientificName: speciesItem.scientificName,
      category: speciesItem.category,
      difficulty: speciesItem.difficulty,
      description: speciesItem.description,
      imageUrl: speciesItem.imageUrl || '',
      occurrences: speciesItem.occurrences || [],
      environmentalSpecs: speciesItem.environmentalSpecs || {
        tempRange: { min: 0, max: 30 },
        visibility: '',
        currents: 'Low',
        depthRange: { min: 0, max: 40 }
      },
      metadata: speciesItem.metadata || {
        trustScore: 50,
        sources: []
      },
      status: speciesItem.status || 'draft'
    });
    setEditingId(speciesItem._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta especie?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_API_URL}/species/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSuccess('Especie eliminada exitosamente');
      fetchSpecies();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar la especie');
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'published' ? 'unpublish' : 'publish';
      await fetch(`${process.env.REACT_APP_API_URL}/species/${id}/${newStatus}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSuccess(`Especie ${currentStatus === 'published' ? 'despublicada' : 'publicada'} exitosamente`);
      fetchSpecies();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al cambiar el estado de la especie');
    }
  };

  const addOccurrence = () => {
    if (!newOccurrence.destination || newOccurrence.months.length === 0) {
      setError('Debes seleccionar un destino y al menos un mes');
      return;
    }
    setFormData(prev => ({
      ...prev,
      occurrences: [...prev.occurrences, { ...newOccurrence }]
    }));
    setNewOccurrence({
      destination: '',
      months: [],
      probability: 50,
      seasonLevel: 'Medium',
      logistics: ''
    });
    setError('');
  };

  const removeOccurrence = (index) => {
    setFormData(prev => ({
      ...prev,
      occurrences: prev.occurrences.filter((_, i) => i !== index)
    }));
  };

  const toggleMonth = (month) => {
    setNewOccurrence(prev => ({
      ...prev,
      months: prev.months.includes(month)
        ? prev.months.filter(m => m !== month)
        : [...prev.months, month]
    }));
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const filteredSpecies = species.filter(s =>
    s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(destSearchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(destSearchTerm.toLowerCase())
  );

  const handleDestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const url = editingDestId 
        ? `${process.env.REACT_APP_API_URL}/destinations/${editingDestId}`
        : `${process.env.REACT_APP_API_URL}/destinations`;
      
      const method = editingDestId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(destFormData)
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.errors 
          ? data.errors.map(e => e.msg).join(', ')
          : data.message || 'Error al guardar el destino';
        throw new Error(errorMsg);
      }

      setSuccess(editingDestId ? 'Destino actualizado exitosamente' : 'Destino creado exitosamente');
      resetDestForm();
      fetchDestinations();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetDestForm = () => {
    setDestFormData({
      name: '',
      country: '',
      region: '',
      coordinates: { latitude: 0, longitude: 0 },
      description: '',
      imageUrl: '',
      isActive: true
    });
    setEditingDestId(null);
    setShowDestForm(false);
  };

  const handleDestEdit = (dest) => {
    setDestFormData({
      name: dest.name,
      country: dest.country,
      region: dest.region || '',
      coordinates: dest.coordinates,
      description: dest.description || '',
      imageUrl: dest.imageUrl || '',
      isActive: dest.isActive
    });
    setEditingDestId(dest._id);
    setShowDestForm(true);
  };

  const handleDestDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este destino?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_API_URL}/destinations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSuccess('Destino eliminado exitosamente');
      fetchDestinations();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar el destino');
    }
  };

  const toggleDestActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.REACT_APP_API_URL}/destinations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      setSuccess(`Destino ${!currentStatus ? 'activado' : 'desactivado'} exitosamente`);
      fetchDestinations();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al cambiar el estado del destino');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-ocean-deep mb-8">Panel de Administración</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab('species')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'species'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Especies
          </button>
          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'destinations'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Destinos
          </button>
        </div>

        {activeTab === 'species' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-ocean-deep">Gestión de Especies</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                <Plus size={20} />
                {showForm ? 'Cancelar' : 'Nueva Especie'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre Común *</label>
                    <input
                      type="text"
                      value={formData.commonName}
                      onChange={(e) => setFormData(prev => ({ ...prev, commonName: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre Científico *</label>
                    <input
                      type="text"
                      value={formData.scientificName}
                      onChange={(e) => setFormData(prev => ({ ...prev, scientificName: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Categoría *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Ej: Tiburón / Gran Depredador"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Dificultad *</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">URL de Imagen</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Descripción *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-ocean-deep mb-4">Ubicaciones y Temporadas</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Destino</label>
                        <select
                          value={newOccurrence.destination}
                          onChange={(e) => setNewOccurrence(prev => ({ ...prev, destination: e.target.value }))}
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="">Seleccionar destino</option>
                          {destinations.filter(d => d.isActive).map(dest => (
                            <option key={dest._id} value={dest._id}>
                              {dest.name}, {dest.country}
                            </option>
                          ))}
                        </select>
                        {destinations.filter(d => d.isActive).length === 0 && (
                          <p className="text-sm text-red-600 mt-1">No hay destinos activos. Crea uno en la pestaña Destinos.</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Probabilidad (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={newOccurrence.probability}
                          onChange={(e) => setNewOccurrence(prev => ({ ...prev, probability: parseInt(e.target.value) }))}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Nivel de Temporada</label>
                        <select
                          value={newOccurrence.seasonLevel}
                          onChange={(e) => setNewOccurrence(prev => ({ ...prev, seasonLevel: e.target.value }))}
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="High">Alto</option>
                          <option value="Medium">Medio</option>
                          <option value="Low">Bajo</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">Logística</label>
                        <input
                          type="text"
                          value={newOccurrence.logistics}
                          onChange={(e) => setNewOccurrence(prev => ({ ...prev, logistics: e.target.value }))}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Ej: Buceo desde embarcación, corrientes moderadas"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Meses</label>
                      <div className="grid grid-cols-6 gap-2">
                        {months.map(month => (
                          <button
                            key={month}
                            type="button"
                            onClick={() => toggleMonth(month)}
                            className={`px-3 py-2 rounded text-sm font-semibold transition ${
                              newOccurrence.months.includes(month)
                                ? 'bg-ocean-blue text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addOccurrence}
                      className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      <Plus size={16} />
                      Agregar Ubicación
                    </button>
                  </div>

                  {formData.occurrences.length > 0 && (
                    <div className="space-y-2">
                      {formData.occurrences.map((occ, index) => {
                        const dest = destinations.find(d => d._id === occ.destination);
                        return (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className="flex-1">
                              <p className="font-semibold">{dest?.name || 'Destino desconocido'}, {dest?.country || ''}</p>
                              <p className="text-sm text-gray-600">
                                Meses: {occ.months.join(', ')} | Probabilidad: {occ.probability}% | Nivel: {occ.seasonLevel}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeOccurrence(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                    className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
                  >
                    <Save size={20} />
                    {loading ? 'Guardando...' : editingId ? 'Actualizar Borrador' : 'Guardar como Borrador'}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    <Eye size={20} />
                    {loading ? 'Guardando...' : editingId ? 'Actualizar y Publicar' : 'Guardar y Publicar'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar especies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-ocean-deep">Especies Registradas</h3>
                {filteredSpecies.length === 0 ? (
                  <p className="text-gray-600">No hay especies registradas</p>
                ) : (
                  <div className="space-y-3">
                    {filteredSpecies.map(s => (
                      <div key={s._id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-lg font-semibold text-ocean-deep">{s.commonName}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                s.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {s.status === 'published' ? 'Publicado' : 'Borrador'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 italic">{s.scientificName}</p>
                            <p className="text-sm text-gray-600">{s.category} | {s.difficulty}</p>
                            <p className="text-sm text-gray-500 mt-1">{s.occurrences?.length || 0} ubicaciones</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => togglePublish(s._id, s.status)}
                              className={`p-2 rounded hover:bg-gray-200 transition ${
                                s.status === 'published' ? 'text-green-600' : 'text-gray-400'
                              }`}
                              title={s.status === 'published' ? 'Despublicar' : 'Publicar'}
                            >
                              {s.status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <button
                              onClick={() => handleEdit(s)}
                              className="p-2 rounded hover:bg-gray-200 transition text-blue-600"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(s._id)}
                              className="p-2 rounded hover:bg-gray-200 transition text-red-600"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        {s.occurrences && s.occurrences.length > 0 && (
                          <div className="mt-4">
                            <SpeciesProbabilityChart occurrences={s.occurrences} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-ocean-deep">Gestión de Destinos</h2>
              <button
                onClick={() => setShowDestForm(!showDestForm)}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                <Plus size={20} />
                {showDestForm ? 'Cancelar' : 'Nuevo Destino'}
              </button>
            </div>

            {showDestForm && (
              <form onSubmit={handleDestSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre del Destino *</label>
                    <input
                      type="text"
                      value={destFormData.name}
                      onChange={(e) => setDestFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Ej: Tiger Beach"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">País *</label>
                    <input
                      type="text"
                      value={destFormData.country}
                      onChange={(e) => setDestFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Ej: Bahamas"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Región</label>
                    <input
                      type="text"
                      value={destFormData.region}
                      onChange={(e) => setDestFormData(prev => ({ ...prev, region: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Ej: Caribe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">URL de Imagen</label>
                    <input
                      type="url"
                      value={destFormData.imageUrl}
                      onChange={(e) => setDestFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Latitud *</label>
                    <input
                      type="number"
                      step="any"
                      min="-90"
                      max="90"
                      value={destFormData.coordinates.latitude}
                      onChange={(e) => setDestFormData(prev => ({ 
                        ...prev, 
                        coordinates: { ...prev.coordinates, latitude: parseFloat(e.target.value) }
                      }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Ej: 26.6406"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Entre -90 y 90</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Longitud *</label>
                    <input
                      type="number"
                      step="any"
                      min="-180"
                      max="180"
                      value={destFormData.coordinates.longitude}
                      onChange={(e) => setDestFormData(prev => ({ 
                        ...prev, 
                        coordinates: { ...prev.coordinates, longitude: parseFloat(e.target.value) }
                      }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Ej: -78.9753"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Entre -180 y 180</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Descripción</label>
                    <textarea
                      value={destFormData.description}
                      onChange={(e) => setDestFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      rows="3"
                      placeholder="Descripción del destino..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={destFormData.isActive}
                        onChange={(e) => setDestFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">Destino Activo</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Los destinos activos aparecen en el selector de especies</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    <Save size={20} />
                    {loading ? 'Guardando...' : editingDestId ? 'Actualizar Destino' : 'Guardar Destino'}
                  </button>
                  <button
                    type="button"
                    onClick={resetDestForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar destinos..."
                    value={destSearchTerm}
                    onChange={(e) => setDestSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-ocean-deep">Destinos Registrados ({destinations.length})</h3>
                {filteredDestinations.length === 0 ? (
                  <p className="text-gray-600">No hay destinos registrados</p>
                ) : (
                  <div className="space-y-3">
                    {filteredDestinations.map(d => (
                      <div key={d._id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-5 h-5 text-ocean-blue" />
                              <h4 className="text-lg font-semibold text-ocean-deep">{d.name}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                d.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {d.isActive ? 'Activo' : 'Inactivo'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Globe className="w-4 h-4" />
                              <span>{d.country}</span>
                              {d.region && <span className="text-gray-400">| {d.region}</span>}
                            </div>
                            <p className="text-sm text-gray-500">
                              Coordenadas: {d.coordinates.latitude.toFixed(4)}°, {d.coordinates.longitude.toFixed(4)}°
                            </p>
                            {d.description && (
                              <p className="text-sm text-gray-600 mt-2">{d.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleDestActive(d._id, d.isActive)}
                              className={`p-2 rounded hover:bg-gray-200 transition ${
                                d.isActive ? 'text-green-600' : 'text-gray-400'
                              }`}
                              title={d.isActive ? 'Desactivar' : 'Activar'}
                            >
                              {d.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <button
                              onClick={() => handleDestEdit(d)}
                              className="p-2 rounded hover:bg-gray-200 transition text-blue-600"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDestDelete(d._id)}
                              className="p-2 rounded hover:bg-gray-200 transition text-red-600"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
