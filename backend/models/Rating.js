const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  // Sistema de 5 máscaras de buceo
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  categories: {
    marineLife: {
      type: Number,
      min: 1,
      max: 5
    },
    visibility: {
      type: Number,
      min: 1,
      max: 5
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5
    },
    facilities: {
      type: Number,
      min: 1,
      max: 5
    },
    value: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  review: {
    type: String,
    maxlength: 1500
  },
  pros: [{
    type: String,
    maxlength: 200
  }],
  cons: [{
    type: String,
    maxlength: 200
  }],
  visitDate: {
    type: Date
  },
  wouldRecommend: {
    type: Boolean,
    default: true
  },
  helpfulVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índice compuesto para evitar múltiples ratings del mismo usuario
ratingSchema.index({ user: 1, destination: 1 }, { unique: true });
ratingSchema.index({ destination: 1, rating: -1 });

module.exports = mongoose.model('Rating', ratingSchema);
