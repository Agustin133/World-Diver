const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserPlace = require('../models/UserPlace');
const { auth } = require('../middleware/auth');

// Obtener todos los lugares del usuario
router.get('/my-places', auth, async (req, res) => {
  try {
    console.log('GET /my-places for user:', req.user._id);
    
    const places = await UserPlace.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    // Popular solo los que tienen destination válido
    const populatedPlaces = await Promise.all(
      places.map(async (place) => {
        if (place.destination) {
          try {
            await place.populate('destination', 'name country coordinates imageUrl');
          } catch (err) {
            console.log('Could not populate destination for place:', place._id);
          }
        }
        return place;
      })
    );
    
    console.log(`Found ${populatedPlaces.length} places`);
    res.json({ places: populatedPlaces });
  } catch (error) {
    console.error('Error fetching user places:', error);
    res.status(500).json({ message: 'Error al obtener lugares del usuario', error: error.message });
  }
});

// Obtener lugares por tipo (visited o wishlist)
router.get('/my-places/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!['visited', 'wishlist'].includes(type)) {
      return res.status(400).json({ message: 'Tipo inválido' });
    }
    
    const places = await UserPlace.find({ user: req.user._id, type })
      .populate('destination', 'name country coordinates imageUrl')
      .populate('photos')
      .sort({ createdAt: -1 });
    
    res.json({ places });
  } catch (error) {
    console.error('Error fetching user places by type:', error);
    res.status(500).json({ message: 'Error al obtener lugares' });
  }
});

// Agregar un lugar
router.post('/', auth, async (req, res) => {
  try {
    const { destination, destinationData, type, coordinates, visitDate, notes, rating, isPublic } = req.body;
    
    console.log('POST /user-places:', { destination, destinationData, type });
    
    // Verificar si ya existe (buscar por destination o destinationData._id)
    let existing;
    if (destination && mongoose.Types.ObjectId.isValid(destination)) {
      existing = await UserPlace.findOne({
        user: req.user._id,
        destination,
        type
      });
    } else if (destinationData?._id) {
      existing = await UserPlace.findOne({
        user: req.user._id,
        'destinationData._id': destinationData._id,
        type
      });
    }
    
    if (existing) {
      console.log('Duplicate found, returning existing');
      // En lugar de error, retornar el existente
      return res.status(200).json({ userPlace: existing, message: 'Ya existe en tu lista' });
    }
    
    const userPlaceData = {
      user: req.user._id,
      type,
      coordinates,
      visitDate,
      notes,
      rating,
      isPublic: isPublic !== undefined ? isPublic : true
    };
    
    // Si es un ObjectId válido, usar destination, sino usar destinationData
    if (destination && mongoose.Types.ObjectId.isValid(destination)) {
      userPlaceData.destination = destination;
    } else if (destinationData) {
      userPlaceData.destinationData = destinationData;
    }
    
    const userPlace = new UserPlace(userPlaceData);
    
    await userPlace.save();
    
    // Intentar popular solo si hay destination válido
    if (userPlace.destination) {
      await userPlace.populate('destination', 'name country coordinates imageUrl');
    }
    
    res.status(201).json({ userPlace });
  } catch (error) {
    console.error('Error creating user place:', error);
    res.status(500).json({ message: 'Error al agregar lugar' });
  }
});

// Actualizar un lugar
router.put('/:id', auth, async (req, res) => {
  try {
    const { notes, rating, visitDate, isPublic } = req.body;
    
    const userPlace = await UserPlace.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!userPlace) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }
    
    if (notes !== undefined) userPlace.notes = notes;
    if (rating !== undefined) userPlace.rating = rating;
    if (visitDate !== undefined) userPlace.visitDate = visitDate;
    if (isPublic !== undefined) userPlace.isPublic = isPublic;
    
    await userPlace.save();
    await userPlace.populate('destination', 'name country coordinates imageUrl');
    
    res.json({ userPlace });
  } catch (error) {
    console.error('Error updating user place:', error);
    res.status(500).json({ message: 'Error al actualizar lugar' });
  }
});

// Eliminar un lugar
router.delete('/:id', auth, async (req, res) => {
  try {
    const userPlace = await UserPlace.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!userPlace) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }
    
    res.json({ message: 'Lugar eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting user place:', error);
    res.status(500).json({ message: 'Error al eliminar lugar' });
  }
});

// Mover lugar entre visited y wishlist
router.patch('/:id/move', auth, async (req, res) => {
  try {
    const { newType } = req.body;
    
    if (!['visited', 'wishlist'].includes(newType)) {
      return res.status(400).json({ message: 'Tipo inválido' });
    }
    
    const userPlace = await UserPlace.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!userPlace) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }
    
    userPlace.type = newType;
    await userPlace.save();
    await userPlace.populate('destination', 'name country coordinates imageUrl');
    
    res.json({ userPlace });
  } catch (error) {
    console.error('Error moving user place:', error);
    res.status(500).json({ message: 'Error al mover lugar' });
  }
});

module.exports = router;
