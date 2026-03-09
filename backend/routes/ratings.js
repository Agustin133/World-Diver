const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const { auth } = require('../middleware/auth');

// Obtener ratings de un destino
router.get('/destination/:destinationId', async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { limit = 20, skip = 0 } = req.query;
    
    const ratings = await Rating.find({ destination: destinationId })
      .populate('user', 'name membershipPlan')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Rating.countDocuments({ destination: destinationId });
    
    // Calcular promedio
    const avgResult = await Rating.aggregate([
      { $match: { destination: destinationId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          avgMarineLife: { $avg: '$categories.marineLife' },
          avgVisibility: { $avg: '$categories.visibility' },
          avgDifficulty: { $avg: '$categories.difficulty' },
          avgFacilities: { $avg: '$categories.facilities' },
          avgValue: { $avg: '$categories.value' }
        }
      }
    ]);
    
    const averages = avgResult.length > 0 ? avgResult[0] : null;
    
    res.json({ ratings, total, averages });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Error al obtener ratings' });
  }
});

// Obtener rating del usuario para un destino
router.get('/destination/:destinationId/my-rating', auth, async (req, res) => {
  try {
    const rating = await Rating.findOne({
      destination: req.params.destinationId,
      user: req.user._id
    });
    
    res.json({ rating });
  } catch (error) {
    console.error('Error fetching user rating:', error);
    res.status(500).json({ message: 'Error al obtener rating' });
  }
});

// Crear o actualizar rating
router.post('/', auth, async (req, res) => {
  try {
    const {
      destination,
      rating,
      categories,
      review,
      pros,
      cons,
      visitDate,
      wouldRecommend
    } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating debe estar entre 1 y 5' });
    }
    
    // Buscar si ya existe un rating
    let existingRating = await Rating.findOne({
      destination,
      user: req.user._id
    });
    
    if (existingRating) {
      // Actualizar rating existente
      existingRating.rating = rating;
      existingRating.categories = categories || existingRating.categories;
      existingRating.review = review;
      existingRating.pros = pros || [];
      existingRating.cons = cons || [];
      existingRating.visitDate = visitDate;
      existingRating.wouldRecommend = wouldRecommend !== undefined ? wouldRecommend : true;
      
      await existingRating.save();
      await existingRating.populate('user', 'name membershipPlan');
      
      return res.json({ rating: existingRating });
    }
    
    // Crear nuevo rating
    const newRating = new Rating({
      user: req.user._id,
      destination,
      rating,
      categories,
      review,
      pros: pros || [],
      cons: cons || [],
      visitDate,
      wouldRecommend: wouldRecommend !== undefined ? wouldRecommend : true
    });
    
    await newRating.save();
    await newRating.populate('user', 'name membershipPlan');
    
    res.status(201).json({ rating: newRating });
  } catch (error) {
    console.error('Error creating/updating rating:', error);
    res.status(500).json({ message: 'Error al guardar rating' });
  }
});

// Eliminar rating
router.delete('/:id', auth, async (req, res) => {
  try {
    const rating = await Rating.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!rating) {
      return res.status(404).json({ message: 'Rating no encontrado' });
    }
    
    res.json({ message: 'Rating eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ message: 'Error al eliminar rating' });
  }
});

// Marcar rating como útil
router.post('/:id/helpful', auth, async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    
    if (!rating) {
      return res.status(404).json({ message: 'Rating no encontrado' });
    }
    
    const voteIndex = rating.helpfulVotes.indexOf(req.user._id);
    
    if (voteIndex > -1) {
      rating.helpfulVotes.splice(voteIndex, 1);
    } else {
      rating.helpfulVotes.push(req.user._id);
    }
    
    await rating.save();
    
    res.json({ helpfulVotes: rating.helpfulVotes.length, voted: voteIndex === -1 });
  } catch (error) {
    console.error('Error toggling helpful vote:', error);
    res.status(500).json({ message: 'Error al procesar voto' });
  }
});

// Obtener ratings del usuario
router.get('/my-ratings', auth, async (req, res) => {
  try {
    const ratings = await Rating.find({ user: req.user._id })
      .populate('destination', 'name country imageUrl')
      .sort({ createdAt: -1 });
    
    res.json({ ratings });
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    res.status(500).json({ message: 'Error al obtener ratings del usuario' });
  }
});

module.exports = router;
