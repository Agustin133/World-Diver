const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ favorites: user.favorites || [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { destinationId } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user.favorites.includes(destinationId)) {
      user.favorites.push(destinationId);
      await user.save();
    }
    
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/remove/:destinationId', auth, async (req, res) => {
  try {
    const { destinationId } = req.params;
    
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(fav => fav !== destinationId);
    await user.save();
    
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
