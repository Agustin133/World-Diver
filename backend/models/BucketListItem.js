const mongoose = require('mongoose');

const bucketListItemSchema = new mongoose.Schema({
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
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  targetDate: {
    type: Date
  },
  budget: {
    estimated: {
      type: Number
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  notes: {
    type: String,
    maxlength: 2000
  },
  questions: [{
    question: {
      type: String,
      maxlength: 500
    },
    answer: {
      type: String,
      maxlength: 1000
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    answeredAt: {
      type: Date
    }
  }],
  checklist: [{
    item: {
      type: String,
      maxlength: 200
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date
    }
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Índice compuesto para evitar duplicados
bucketListItemSchema.index({ user: 1, destination: 1 }, { unique: false });
bucketListItemSchema.index({ user: 1, 'destinationData._id': 1 }, { unique: false });

module.exports = mongoose.model('BucketListItem', bucketListItemSchema);
