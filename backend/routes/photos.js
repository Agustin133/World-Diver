const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const { auth } = require('../middleware/auth');

// Límite de tamaño de archivo (5MB en base64)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Obtener fotos de un destino
router.get('/destination/:destinationId', async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { limit = 20, skip = 0, featured } = req.query;
    
    const query = { destination: destinationId, isPublic: true };
    if (featured === 'true') query.isFeatured = true;
    
    const photos = await Photo.find(query)
      .select('-imageData') // No enviar la imagen completa en el listado
      .populate('user', 'name')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Photo.countDocuments(query);
    
    res.json({ photos, total });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Error al obtener fotos' });
  }
});

// Obtener una foto completa
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id)
      .populate('user', 'name');
    
    if (!photo) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    
    if (!photo.isPublic) {
      return res.status(403).json({ message: 'Foto no pública' });
    }
    
    res.json({ photo });
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ message: 'Error al obtener foto' });
  }
});

// Obtener fotos del usuario
router.get('/user/my-photos', auth, async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.user._id })
      .select('-imageData')
      .populate('destination', 'name country')
      .sort({ createdAt: -1 });
    
    res.json({ photos });
  } catch (error) {
    console.error('Error fetching user photos:', error);
    res.status(500).json({ message: 'Error al obtener fotos del usuario' });
  }
});

// Subir una foto
router.post('/', auth, async (req, res) => {
  try {
    const { destination, userPlace, title, description, imageData, imageType, tags, isPublic } = req.body;
    
    if (!imageData || !imageType) {
      return res.status(400).json({ message: 'Imagen requerida' });
    }
    
    // Validar tipo de imagen
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(imageType)) {
      return res.status(400).json({ message: 'Tipo de imagen no soportado' });
    }
    
    // Calcular tamaño aproximado del base64
    const fileSize = Math.ceil((imageData.length * 3) / 4);
    
    if (fileSize > MAX_FILE_SIZE) {
      return res.status(400).json({ message: 'La imagen es demasiado grande (máximo 5MB)' });
    }
    
    const photo = new Photo({
      user: req.user._id,
      destination,
      userPlace,
      title,
      description,
      imageData,
      imageType,
      fileSize,
      tags: tags || [],
      isPublic: isPublic !== undefined ? isPublic : true
    });
    
    await photo.save();
    
    // Retornar sin imageData para ahorrar ancho de banda
    const photoResponse = photo.toObject();
    delete photoResponse.imageData;
    
    res.status(201).json({ photo: photoResponse });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Error al subir foto' });
  }
});

// Actualizar una foto
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, tags, isPublic } = req.body;
    
    const photo = await Photo.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!photo) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    
    if (title !== undefined) photo.title = title;
    if (description !== undefined) photo.description = description;
    if (tags !== undefined) photo.tags = tags;
    if (isPublic !== undefined) photo.isPublic = isPublic;
    
    await photo.save();
    
    const photoResponse = photo.toObject();
    delete photoResponse.imageData;
    
    res.json({ photo: photoResponse });
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ message: 'Error al actualizar foto' });
  }
});

// Eliminar una foto
router.delete('/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!photo) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    
    res.json({ message: 'Foto eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ message: 'Error al eliminar foto' });
  }
});

// Like/Unlike una foto
router.post('/:id/like', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    
    const likeIndex = photo.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      photo.likes.splice(likeIndex, 1);
    } else {
      photo.likes.push(req.user._id);
    }
    
    await photo.save();
    
    res.json({ likes: photo.likes.length, liked: likeIndex === -1 });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Error al procesar like' });
  }
});

module.exports = router;
