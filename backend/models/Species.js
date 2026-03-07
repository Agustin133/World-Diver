const mongoose = require('mongoose');

const occurrenceSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  months: [{
    type: String,
    enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }],
  probability: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  seasonLevel: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  logistics: {
    type: String,
    default: ''
  }
});

const environmentalSpecsSchema = new mongoose.Schema({
  tempRange: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 30 }
  },
  visibility: {
    type: String,
    default: ''
  },
  currents: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  depthRange: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 40 }
  }
});

const metadataSchema = new mongoose.Schema({
  trustScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  sources: [{
    type: String
  }]
});

const speciesSchema = new mongoose.Schema({
  commonName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  scientificName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Principiante', 'Intermedio', 'Avanzado'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  occurrences: [occurrenceSchema],
  environmentalSpecs: environmentalSpecsSchema,
  metadata: metadataSchema,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

speciesSchema.index({ commonName: 'text', scientificName: 'text', category: 'text' });

module.exports = mongoose.model('Species', speciesSchema);
