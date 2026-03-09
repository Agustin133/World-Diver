/**
 * Middleware para verificar permisos de membresía
 * Por ahora todas las features están disponibles para todos los usuarios
 * Esta estructura está preparada para futuras restricciones
 */

const checkMembership = (requiredPlan = null) => {
  return (req, res, next) => {
    // Si no se requiere autenticación, continuar
    if (!req.user) {
      return res.status(401).json({ message: 'Autenticación requerida' });
    }

    // Por ahora, todas las features están disponibles para todos
    // En el futuro, aquí se verificará el plan de membresía
    if (requiredPlan) {
      const userPlan = req.user.membershipPlan || 'free';
      
      // Definir jerarquía de planes
      const planHierarchy = {
        'free': 0,
        'regular': 1,
        'premium': 2
      };
      
      const userLevel = planHierarchy[userPlan] || 0;
      const requiredLevel = planHierarchy[requiredPlan] || 0;
      
      // Por ahora, permitir acceso a todos
      // En el futuro, descomentar esta línea:
      // if (userLevel < requiredLevel) {
      //   return res.status(403).json({ 
      //     message: 'Esta función requiere una membresía superior',
      //     requiredPlan,
      //     currentPlan: userPlan
      //   });
      // }
    }

    next();
  };
};

// Middleware específicos para diferentes features
const requirePremium = checkMembership('premium');
const requireRegular = checkMembership('regular');

// Verificar si el usuario puede interactuar (comentar, subir fotos, etc.)
const canInteract = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Debes iniciar sesión para interactuar' });
  }
  
  // Por ahora, todos los usuarios autenticados pueden interactuar
  // En el futuro, aquí se pueden agregar restricciones adicionales
  next();
};

// Verificar límites de uso (por ejemplo, número de fotos)
const checkUsageLimits = (feature) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Autenticación requerida' });
    }

    // Por ahora, sin límites
    // En el futuro, implementar límites basados en el plan
    const limits = {
      free: {
        photos: 10,
        bucketListItems: 5,
        comments: 20
      },
      regular: {
        photos: 50,
        bucketListItems: 20,
        comments: 100
      },
      premium: {
        photos: -1, // ilimitado
        bucketListItems: -1,
        comments: -1
      }
    };

    // Por ahora, permitir todo
    next();
  };
};

module.exports = {
  checkMembership,
  requirePremium,
  requireRegular,
  canInteract,
  checkUsageLimits
};
