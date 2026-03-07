const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Species = require('../models/Species');
const Destination = require('../models/Destination');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/world-divers', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    await User.deleteMany({});
    await Species.deleteMany({});
    await Destination.deleteMany({});

    console.log('🗑️  Cleared existing data');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@worlddivers.com',
      password: hashedPassword,
      role: 'admin',
      membershipPlan: 'pro',
      membershipStatus: 'active'
    });

    console.log('✅ Admin user created');

    const destinations = await Destination.insertMany([
      {
        name: 'Tiger Beach',
        country: 'Bahamas',
        region: 'Caribe',
        coordinates: { latitude: 26.6406, longitude: -78.9753 },
        description: 'Famoso por sus encuentros con tiburones tigre',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        isActive: true
      },
      {
        name: 'Isla Guadalupe',
        country: 'México',
        region: 'Pacífico',
        coordinates: { latitude: 29.0333, longitude: -118.2833 },
        description: 'El mejor lugar del mundo para ver tiburones blancos',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        isActive: true
      },
      {
        name: 'Isla Cocos',
        country: 'Costa Rica',
        region: 'Pacífico',
        coordinates: { latitude: 5.5333, longitude: -87.0667 },
        description: 'Paraíso de tiburones martillo',
        imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
        isActive: true
      },
      {
        name: 'Raja Ampat',
        country: 'Indonesia',
        region: 'Indo-Pacífico',
        coordinates: { latitude: -0.2500, longitude: 130.5167 },
        description: 'La biodiversidad marina más alta del planeta',
        imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
        isActive: true
      },
      {
        name: 'Galápagos',
        country: 'Ecuador',
        region: 'Pacífico',
        coordinates: { latitude: -0.9538, longitude: -90.9656 },
        description: 'Encuentros únicos con vida marina endémica',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        isActive: true
      }
    ]);

    console.log('✅ Destinations created');

    const species = await Species.insertMany([
      {
        commonName: 'Tiburón Tigre',
        scientificName: 'Galeocerdo cuvier',
        category: 'Tiburón / Gran Depredador',
        difficulty: 'Avanzado',
        description: 'El tiburón tigre es uno de los depredadores más grandes del océano, conocido por sus distintivas rayas verticales.',
        imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800&q=80',
        occurrences: [
          {
            destination: destinations[0]._id,
            months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            probability: 95,
            seasonLevel: 'High',
            logistics: 'Buceo desde embarcación, corrientes moderadas'
          }
        ],
        environmentalSpecs: {
          tempRange: { min: 24, max: 28 },
          visibility: '20-30m',
          currents: 'Medium',
          depthRange: { min: 15, max: 30 }
        },
        metadata: {
          trustScore: 95,
          sources: ['NOAA', 'Marine Biology Research']
        },
        status: 'published',
        createdBy: adminUser._id
      },
      {
        commonName: 'Tiburón Blanco',
        scientificName: 'Carcharodon carcharias',
        category: 'Tiburón / Gran Depredador',
        difficulty: 'Avanzado',
        description: 'El gran tiburón blanco es el pez depredador más grande del mundo.',
        imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800&q=80',
        occurrences: [
          {
            destination: destinations[1]._id,
            months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            probability: 90,
            seasonLevel: 'High',
            logistics: 'Buceo en jaula, aguas frías'
          }
        ],
        environmentalSpecs: {
          tempRange: { min: 15, max: 20 },
          visibility: '15-25m',
          currents: 'Medium',
          depthRange: { min: 10, max: 25 }
        },
        metadata: {
          trustScore: 98,
          sources: ['Shark Research Institute']
        },
        status: 'published',
        createdBy: adminUser._id
      },
      {
        commonName: 'Tiburón Martillo',
        scientificName: 'Sphyrna mokarran',
        category: 'Tiburón / Pelágico',
        difficulty: 'Intermedio',
        description: 'Reconocible por su cabeza en forma de martillo, estos tiburones suelen formar grandes cardúmenes.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        occurrences: [
          {
            destination: destinations[2]._id,
            months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            probability: 85,
            seasonLevel: 'High',
            logistics: 'Buceo profundo, corrientes fuertes'
          }
        ],
        environmentalSpecs: {
          tempRange: { min: 22, max: 27 },
          visibility: '20-40m',
          currents: 'High',
          depthRange: { min: 20, max: 40 }
        },
        metadata: {
          trustScore: 92,
          sources: ['Cocos Island Research']
        },
        status: 'published',
        createdBy: adminUser._id
      },
      {
        commonName: 'Manta Raya',
        scientificName: 'Manta birostris',
        category: 'Raya / Pelágico',
        difficulty: 'Principiante',
        description: 'Las mantas rayas son las rayas más grandes del mundo, conocidas por su gracia y comportamiento curioso.',
        imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
        occurrences: [
          {
            destination: destinations[3]._id,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'Oct', 'Nov', 'Dec'],
            probability: 80,
            seasonLevel: 'High',
            logistics: 'Buceo desde embarcación, aguas tranquilas'
          }
        ],
        environmentalSpecs: {
          tempRange: { min: 26, max: 30 },
          visibility: '25-40m',
          currents: 'Low',
          depthRange: { min: 5, max: 25 }
        },
        metadata: {
          trustScore: 90,
          sources: ['Manta Trust']
        },
        status: 'published',
        createdBy: adminUser._id
      },
      {
        commonName: 'Iguana Marina',
        scientificName: 'Amblyrhynchus cristatus',
        category: 'Reptil / Endémico',
        difficulty: 'Principiante',
        description: 'Única iguana marina del mundo, endémica de las Islas Galápagos.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        occurrences: [
          {
            destination: destinations[4]._id,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            probability: 100,
            seasonLevel: 'High',
            logistics: 'Buceo desde costa, aguas tranquilas'
          }
        ],
        environmentalSpecs: {
          tempRange: { min: 18, max: 25 },
          visibility: '15-30m',
          currents: 'Low',
          depthRange: { min: 2, max: 15 }
        },
        metadata: {
          trustScore: 100,
          sources: ['Galápagos Conservancy']
        },
        status: 'published',
        createdBy: adminUser._id
      }
    ]);

    console.log('✅ Species created');
    console.log('\n📊 Summary:');
    console.log(`   - Admin user: admin@worlddivers.com / admin123`);
    console.log(`   - Destinations: ${destinations.length}`);
    console.log(`   - Species: ${species.length}`);
    console.log('\n✅ Seed completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
