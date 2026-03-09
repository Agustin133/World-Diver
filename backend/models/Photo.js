const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  userPlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserPlace'
  },
  title: {
    type: String,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 1000
  },
  // Almacenamiento en MongoDB (Base64 para fotos pequeñas)
  imageData: {
    type: String,
    required: true
  },
  imageType: {
    type: String,
    required: true,
    enum: ['image/jpeg', 'image/png', 'image/webp']
  },
  fileSize: {
    type: Number,
    required: true
  },
  // Metadata
  tags: [{
    type: String
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices
photoSchema.index({ destination: 1, createdAt: -1 });
photoSchema.index({ user: 1 });
photoSchema.index({ isFeatured: 1, isPublic: 1 });

module.exports = mongoose.model('Photo', photoSchema);
