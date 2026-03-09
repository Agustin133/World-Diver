const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const membershipRoutes = require('./routes/memberships');
const favoriteRoutes = require('./routes/favorites');
const speciesRoutes = require('./routes/species');
const destinationRoutes = require('./routes/destinations');
const userPlacesRoutes = require('./routes/userPlaces');
const commentsRoutes = require('./routes/comments');
const photosRoutes = require('./routes/photos');
const bucketlistRoutes = require('./routes/bucketlist');
const ratingsRoutes = require('./routes/ratings');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://world-divers.vercel.app',
  'https://world-diver.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/world-divers')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/species', speciesRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/user-places', userPlacesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/bucketlist', bucketlistRoutes);
app.use('/api/ratings', ratingsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'World Divers API is running 🌊' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'World Divers API is running 🌊', status: 'ok' });
});

// Ruta temporal para eliminar índices problemáticos
app.get('/api/fix-indexes', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const results = [];
    
    try {
      await db.collection('userplaces').dropIndex('user_1_destination_1_type_1');
      results.push('Dropped user_1_destination_1_type_1 from userplaces');
    } catch (err) {
      results.push('Index user_1_destination_1_type_1 not found or already dropped');
    }
    
    try {
      await db.collection('bucketlistitems').dropIndex('user_1_destination_1');
      results.push('Dropped user_1_destination_1 from bucketlistitems');
    } catch (err) {
      results.push('Index user_1_destination_1 not found or already dropped');
    }
    
    res.json({ message: 'Indexes fixed', results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
