const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Species = require('../models/Species');
const Destination = require('../models/Destination');

const seedTigerShark = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/world-divers', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');

    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('❌ Admin user not found. Please run npm run seed first.');
      process.exit(1);
    }

    const existingSpecies = await Species.findOne({ scientificName: 'Galeocerdo cuvier' });
    if (existingSpecies) {
      await Species.deleteOne({ scientificName: 'Galeocerdo cuvier' });
      console.log('🗑️  Removed existing Tiger Shark');
    }

    const destinations = await Destination.find({ isActive: true });
    if (destinations.length === 0) {
      console.log('❌ No active destinations found. Please run npm run seed first.');
      process.exit(1);
    }

    const tigerBeach = destinations.find(d => d.name === 'Tiger Beach');
    const guadalupe = destinations.find(d => d.name === 'Isla Guadalupe');
    const cocos = destinations.find(d => d.name === 'Isla Cocos');

    const tigerShark = await Species.create({
      commonName: 'Tiburón Tigre',
      scientificName: 'Galeocerdo cuvier',
      category: 'Tiburón / Gran Depredador',
      difficulty: 'Avanzado',
      description: 'El tiburón tigre es uno de los depredadores más grandes del océano. Su nombre proviene de las rayas oscuras verticales que recorren los lados de su cuerpo, similares a las de un tigre. Estos tiburones son conocidos por su apetito voraz y su capacidad para comer casi cualquier cosa. Son curiosos por naturaleza y se acercan a los buzos, lo que los convierte en una experiencia de buceo emocionante pero que requiere experiencia y precaución.',
      imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800&q=80',
      occurrences: [
        {
          destination: tigerBeach._id,
          months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
          probability: 95,
          seasonLevel: 'High',
          logistics: 'Buceo desde embarcación especializada. Corrientes moderadas. Se recomienda experiencia previa con tiburones.'
        },
        {
          destination: guadalupe._id,
          months: ['Aug', 'Sep', 'Oct', 'Nov'],
          probability: 70,
          seasonLevel: 'Medium',
          logistics: 'Buceo en jaula opcional. Aguas más frías. Visibilidad excelente.'
        },
        {
          destination: cocos._id,
          months: ['Jun', 'Jul', 'Aug', 'Sep'],
          probability: 60,
          seasonLevel: 'Medium',
          logistics: 'Buceo profundo. Corrientes fuertes. Solo para buzos avanzados.'
        }
      ],
      environmentalSpecs: {
        tempRange: { min: 20, max: 28 },
        visibility: '20-30m',
        currents: 'Medium',
        depthRange: { min: 10, max: 35 }
      },
      metadata: {
        trustScore: 95,
        sources: [
          'NOAA Fisheries',
          'Marine Biology Research Institute',
          'Shark Research Committee',
          'International Union for Conservation of Nature (IUCN)'
        ]
      },
      status: 'published',
      createdBy: adminUser._id
    });

    console.log('✅ Tiger Shark created with multiple destinations');
    console.log('\n📊 Details:');
    console.log(`   - Common Name: ${tigerShark.commonName}`);
    console.log(`   - Scientific Name: ${tigerShark.scientificName}`);
    console.log(`   - Occurrences: ${tigerShark.occurrences.length} destinations`);
    console.log(`   - Status: ${tigerShark.status}`);
    console.log('\n✅ Seed completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Tiger Shark:', error);
    process.exit(1);
  }
};

seedTigerShark();
