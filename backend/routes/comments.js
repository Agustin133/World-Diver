const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { auth } = require('../middleware/auth');

// Obtener comentarios de un destino
router.get('/destination/:destinationId', async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { type, limit = 50, skip = 0 } = req.query;
    
    const query = { destination: destinationId };
    if (type) query.type = type;
    
    const comments = await Comment.find(query)
      .populate('user', 'name email membershipPlan')
      .populate('replies.user', 'name')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Comment.countDocuments(query);
    
    res.json({ comments, total });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
});

// Crear un comentario
router.post('/', auth, async (req, res) => {
  try {
    const { destination, content, type } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'El contenido es requerido' });
    }
    
    const comment = new Comment({
      user: req.user._id,
      destination,
      content: content.trim(),
      type: type || 'general'
    });
    
    await comment.save();
    await comment.populate('user', 'name email membershipPlan');
    
    res.status(201).json({ comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error al crear comentario' });
  }
});

// Editar un comentario
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const comment = await Comment.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    comment.content = content.trim();
    comment.isEdited = true;
    comment.editedAt = new Date();
    
    await comment.save();
    await comment.populate('user', 'name email membershipPlan');
    
    res.json({ comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error al actualizar comentario' });
  }
});

// Eliminar un comentario
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    res.json({ message: 'Comentario eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error al eliminar comentario' });
  }
});

// Like/Unlike un comentario
router.post('/:id/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    const likeIndex = comment.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Unlike
      comment.likes.splice(likeIndex, 1);
    } else {
      // Like
      comment.likes.push(req.user._id);
    }
    
    await comment.save();
    
    res.json({ likes: comment.likes.length, liked: likeIndex === -1 });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Error al procesar like' });
  }
});

// Agregar una respuesta
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    comment.replies.push({
      user: req.user._id,
      content: content.trim(),
      createdAt: new Date()
    });
    
    await comment.save();
    await comment.populate('replies.user', 'name');
    
    res.json({ comment });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Error al agregar respuesta' });
  }
});

module.exports = router;
