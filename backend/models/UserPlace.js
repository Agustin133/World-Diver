const mongoose = require('mongoose');

const userPlaceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  // Datos del destino (para destinos hardcodeados que no están en DB)
  destinationData: {
    _id: String,
    name: String,
    country: String,
    imageUrl: String
  },
  type: {
    type: String,
    enum: ['visited', 'wishlist'],
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  visitDate: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes (no únicos para evitar conflictos con null)
userPlaceSchema.index({ user: 1, destination: 1, type: 1 });
userPlaceSchema.index({ user: 1, 'destinationData._id': 1, type: 1 });

module.exports = mongoose.model('UserPlace', userPlaceSchema);
