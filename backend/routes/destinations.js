const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const Destination = require('../models/Destination');

router.get('/', async (req, res) => {
  try {
    const { search, isActive } = req.query;
    
    let query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    
    res.json({ destinations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.json({ destination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', [
  auth,
  isAdmin,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('coordinates.latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('coordinates.longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      country,
      region,
      coordinates,
      description,
      imageUrl,
      isActive
    } = req.body;

    const destination = new Destination({
      name,
      country,
      region: region || '',
      coordinates,
      description: description || '',
      imageUrl: imageUrl || '',
      isActive: isActive !== undefined ? isActive : true
    });

    await destination.save();

    res.status(201).json({ 
      message: 'Destination created successfully',
      destination 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', [
  auth,
  isAdmin
], async (req, res) => {
  try {
    const {
      name,
      country,
      region,
      coordinates,
      description,
      imageUrl,
      isActive
    } = req.body;

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    if (name) destination.name = name;
    if (country) destination.country = country;
    if (region !== undefined) destination.region = region;
    if (coordinates) destination.coordinates = coordinates;
    if (description !== undefined) destination.description = description;
    if (imageUrl !== undefined) destination.imageUrl = imageUrl;
    if (isActive !== undefined) destination.isActive = isActive;

    await destination.save();

    res.json({ 
      message: 'Destination updated successfully',
      destination 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
