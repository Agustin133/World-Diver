const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BucketListItem = require('../models/BucketListItem');
const { auth } = require('../middleware/auth');

// Obtener bucket list del usuario
router.get('/', auth, async (req, res) => {
  try {
    const items = await BucketListItem.find({ user: req.user._id })
      .populate('destination', 'name country coordinates imageUrl')
      .sort({ priority: -1, createdAt: -1 });
    
    res.json({ items });
  } catch (error) {
    console.error('Error fetching bucket list:', error);
    res.status(500).json({ message: 'Error al obtener bucket list' });
  }
});

// Agregar item al bucket list
router.post('/', auth, async (req, res) => {
  try {
    const { destination, destinationData, priority, targetDate, budget, notes } = req.body;
    
    // Verificar si ya existe
    let existing;
    if (destination && mongoose.Types.ObjectId.isValid(destination)) {
      existing = await BucketListItem.findOne({
        user: req.user._id,
        destination
      });
    } else if (destinationData?._id) {
      existing = await BucketListItem.findOne({
        user: req.user._id,
        'destinationData._id': destinationData._id
      });
    }
    
    if (existing) {
      return res.status(400).json({ message: 'Este destino ya está en tu bucket list' });
    }
    
    const itemData = {
      user: req.user._id,
      priority: priority || 'medium',
      targetDate,
      budget,
      notes
    };
    
    // Si es un ObjectId válido, usar destination, sino usar destinationData
    if (destination && mongoose.Types.ObjectId.isValid(destination)) {
      itemData.destination = destination;
    } else if (destinationData) {
      itemData.destinationData = destinationData;
    }
    
    const item = new BucketListItem(itemData);
    
    await item.save();
    
    // Intentar popular solo si hay destination válido
    if (item.destination) {
      await item.populate('destination', 'name country coordinates imageUrl');
    }
    
    res.status(201).json({ item });
  } catch (error) {
    console.error('Error creating bucket list item:', error);
    res.status(500).json({ message: 'Error al agregar al bucket list' });
  }
});

// Actualizar item del bucket list
router.put('/:id', auth, async (req, res) => {
  try {
    const { priority, targetDate, budget, notes, isCompleted } = req.body;
    
    const item = await BucketListItem.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    if (priority !== undefined) item.priority = priority;
    if (targetDate !== undefined) item.targetDate = targetDate;
    if (budget !== undefined) item.budget = budget;
    if (notes !== undefined) item.notes = notes;
    if (isCompleted !== undefined) {
      item.isCompleted = isCompleted;
      if (isCompleted) item.completedAt = new Date();
    }
    
    await item.save();
    await item.populate('destination', 'name country coordinates imageUrl');
    
    res.json({ item });
  } catch (error) {
    console.error('Error updating bucket list item:', error);
    res.status(500).json({ message: 'Error al actualizar item' });
  }
});

// Eliminar item del bucket list
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await BucketListItem.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    // Eliminar el item del bucket list
    await BucketListItem.findByIdAndDelete(req.params.id);
    
    // También eliminar el UserPlace asociado (pin verde en el mapa)
    const UserPlace = require('../models/UserPlace');
    let deletedUserPlace = null;
    
    if (item.destination) {
      deletedUserPlace = await UserPlace.findOneAndDelete({
        user: req.user._id,
        destination: item.destination,
        type: 'wishlist'
      });
    } else if (item.destinationData?._id) {
      deletedUserPlace = await UserPlace.findOneAndDelete({
        user: req.user._id,
        'destinationData._id': item.destinationData._id,
        type: 'wishlist'
      });
    }
    
    res.json({ 
      message: 'Item eliminado exitosamente',
      deletedCheckpoints: item.checklist?.length || 0,
      deletedQuestions: item.questions?.length || 0,
      deletedPin: !!deletedUserPlace
    });
  } catch (error) {
    console.error('Error deleting bucket list item:', error);
    res.status(500).json({ message: 'Error al eliminar item' });
  }
});

// Agregar pregunta
router.post('/:id/questions', auth, async (req, res) => {
  try {
    const { question } = req.body;
    
    const item = await BucketListItem.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    item.questions.push({ question });
    await item.save();
    
    res.json({ item });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Error al agregar pregunta' });
  }
});

// Responder pregunta
router.put('/:id/questions/:questionId/answer', auth, async (req, res) => {
  try {
    const { answer } = req.body;
    
    const item = await BucketListItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    const question = item.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    
    question.answer = answer;
    question.answeredBy = req.user._id;
    question.answeredAt = new Date();
    
    await item.save();
    
    res.json({ item });
  } catch (error) {
    console.error('Error answering question:', error);
    res.status(500).json({ message: 'Error al responder pregunta' });
  }
});

// Agregar item al checklist
router.post('/:id/checklist', auth, async (req, res) => {
  try {
    const { item: checklistItem } = req.body;
    
    const bucketItem = await BucketListItem.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!bucketItem) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    bucketItem.checklist.push({ item: checklistItem });
    await bucketItem.save();
    
    res.json({ item: bucketItem });
  } catch (error) {
    console.error('Error adding checklist item:', error);
    res.status(500).json({ message: 'Error al agregar item al checklist' });
  }
});

// Marcar item del checklist como completado
router.patch('/:id/checklist/:checklistId', auth, async (req, res) => {
  try {
    const { completed } = req.body;
    
    const item = await BucketListItem.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    const checklistItem = item.checklist.id(req.params.checklistId);
    if (!checklistItem) {
      return res.status(404).json({ message: 'Checklist item no encontrado' });
    }
    
    checklistItem.completed = completed;
    if (completed) checklistItem.completedAt = new Date();
    
    await item.save();
    
    res.json({ item });
  } catch (error) {
    console.error('Error updating checklist item:', error);
    res.status(500).json({ message: 'Error al actualizar checklist' });
  }
});

module.exports = router;
