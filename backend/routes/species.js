const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const Species = require('../models/Species');
const Destination = require('../models/Destination');

router.get('/', async (req, res) => {
  try {
    const { status, search, month } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = 'published';
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (month) {
      query['occurrences.months'] = month;
    }
    
    const species = await Species.find(query)
      .populate('occurrences.destination')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ species });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findById(req.params.id)
      .populate('occurrences.destination')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }
    
    res.json({ species });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', [
  auth,
  isAdmin,
  body('commonName').trim().notEmpty().withMessage('Common name is required'),
  body('scientificName').trim().notEmpty().withMessage('Scientific name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('difficulty').isIn(['Principiante', 'Intermedio', 'Avanzado']).withMessage('Invalid difficulty level'),
  body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      commonName,
      scientificName,
      category,
      difficulty,
      description,
      imageUrl,
      occurrences,
      environmentalSpecs,
      metadata,
      status
    } = req.body;

    const existingSpecies = await Species.findOne({ scientificName });
    if (existingSpecies) {
      return res.status(400).json({ message: 'Species with this scientific name already exists' });
    }

    if (occurrences && occurrences.length > 0) {
      for (let occurrence of occurrences) {
        const destination = await Destination.findById(occurrence.destination);
        if (!destination) {
          return res.status(400).json({ message: `Destination ${occurrence.destination} not found` });
        }
      }
    }

    const species = new Species({
      commonName,
      scientificName,
      category,
      difficulty,
      description,
      imageUrl: imageUrl || '',
      occurrences: occurrences || [],
      environmentalSpecs: environmentalSpecs || {
        tempRange: { min: 0, max: 30 },
        visibility: '',
        currents: 'Low',
        depthRange: { min: 0, max: 40 }
      },
      metadata: metadata || {
        trustScore: 50,
        sources: []
      },
      status: status || 'draft',
      createdBy: req.user._id
    });

    await species.save();

    const populatedSpecies = await Species.findById(species._id)
      .populate('occurrences.destination')
      .populate('createdBy', 'name email');

    res.status(201).json({ 
      message: 'Species created successfully',
      species: populatedSpecies 
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
      commonName,
      scientificName,
      category,
      difficulty,
      description,
      imageUrl,
      occurrences,
      environmentalSpecs,
      metadata,
      status
    } = req.body;

    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    if (scientificName && scientificName !== species.scientificName) {
      const existingSpecies = await Species.findOne({ scientificName });
      if (existingSpecies) {
        return res.status(400).json({ message: 'Species with this scientific name already exists' });
      }
    }

    if (occurrences && occurrences.length > 0) {
      for (let occurrence of occurrences) {
        const destination = await Destination.findById(occurrence.destination);
        if (!destination) {
          return res.status(400).json({ message: `Destination ${occurrence.destination} not found` });
        }
      }
    }

    if (commonName) species.commonName = commonName;
    if (scientificName) species.scientificName = scientificName;
    if (category) species.category = category;
    if (difficulty) species.difficulty = difficulty;
    if (description) species.description = description;
    if (imageUrl !== undefined) species.imageUrl = imageUrl;
    if (occurrences) species.occurrences = occurrences;
    if (environmentalSpecs) species.environmentalSpecs = environmentalSpecs;
    if (metadata) species.metadata = metadata;
    if (status) species.status = status;
    species.updatedBy = req.user._id;

    await species.save();

    const populatedSpecies = await Species.findById(species._id)
      .populate('occurrences.destination')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({ 
      message: 'Species updated successfully',
      species: populatedSpecies 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    await Species.findByIdAndDelete(req.params.id);
    res.json({ message: 'Species deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/publish', [auth, isAdmin], async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    species.status = 'published';
    species.updatedBy = req.user._id;
    await species.save();

    const populatedSpecies = await Species.findById(species._id)
      .populate('occurrences.destination')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({ 
      message: 'Species published successfully',
      species: populatedSpecies 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/unpublish', [auth, isAdmin], async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    species.status = 'draft';
    species.updatedBy = req.user._id;
    await species.save();

    const populatedSpecies = await Species.findById(species._id)
      .populate('occurrences.destination')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({ 
      message: 'Species unpublished successfully',
      species: populatedSpecies 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
