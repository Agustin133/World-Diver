const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Membership = require('../models/Membership');

const MEMBERSHIP_PLANS = {
  free: { price: 0, duration: 365 },
  pro: { price: 9.99, duration: 30 },
  'dive-center': { price: 49.99, duration: 30 }
};

router.get('/plans', (req, res) => {
  res.json({
    plans: [
      {
        id: 'free',
        name: 'Explorador',
        price: 0,
        duration: 'Permanente',
        features: [
          'Búsqueda básica de animales',
          'Información de temporadas',
          'Acceso a guías básicas',
          'Comunidad limitada'
        ]
      },
      {
        id: 'pro',
        name: 'Buceador Pro',
        price: 9.99,
        duration: 'Mensual',
        features: [
          'Todo lo de Explorador',
          'Planificador de viajes avanzado',
          'Mapas interactivos completos',
          'Alertas personalizadas',
          'Acceso prioritario a eventos',
          'Sin anuncios',
          'Guardar destinos favoritos'
        ],
        popular: true
      },
      {
        id: 'dive-center',
        name: 'Centro de Buceo',
        price: 49.99,
        duration: 'Mensual',
        features: [
          'Todo lo de Buceador Pro',
          'Perfil destacado en directorio',
          'Análisis de tendencias',
          'Herramientas de marketing',
          'Soporte prioritario',
          'API de integración',
          'Dashboard de administración'
        ]
      }
    ]
  });
});

router.post('/subscribe', auth, async (req, res) => {
  try {
    const { plan } = req.body;
    
    if (!MEMBERSHIP_PLANS[plan]) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const user = await User.findById(req.user._id);
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + MEMBERSHIP_PLANS[plan].duration);
    
    const membership = new Membership({
      userId: user._id,
      plan,
      price: MEMBERSHIP_PLANS[plan].price,
      expiryDate
    });
    
    await membership.save();
    
    user.membershipPlan = plan;
    user.membershipStatus = 'active';
    user.membershipExpiry = expiryDate;
    await user.save();
    
    res.json({
      message: 'Subscription successful',
      membership: {
        plan: membership.plan,
        status: membership.status,
        expiryDate: membership.expiryDate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/current', auth, async (req, res) => {
  try {
    const membership = await Membership.findOne({ 
      userId: req.user._id,
      status: 'active'
    }).sort({ createdAt: -1 });
    
    res.json({ membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/cancel', auth, async (req, res) => {
  try {
    const membership = await Membership.findOne({
      userId: req.user._id,
      status: 'active'
    });
    
    if (!membership) {
      return res.status(404).json({ message: 'No active membership found' });
    }
    
    membership.status = 'cancelled';
    await membership.save();
    
    const user = await User.findById(req.user._id);
    user.membershipStatus = 'cancelled';
    await user.save();
    
    res.json({ message: 'Membership cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
