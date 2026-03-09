const mongoose = require('mongoose');
require('dotenv').config();

async function dropIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/world-divers');
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Drop indexes from UserPlace collection
    try {
      await db.collection('userplaces').dropIndex('user_1_destination_1_type_1');
      console.log('✅ Dropped user_1_destination_1_type_1 index from userplaces');
    } catch (err) {
      console.log('Index user_1_destination_1_type_1 does not exist or already dropped');
    }

    // Drop indexes from BucketListItem collection
    try {
      await db.collection('bucketlistitems').dropIndex('user_1_destination_1');
      console.log('✅ Dropped user_1_destination_1 index from bucketlistitems');
    } catch (err) {
      console.log('Index user_1_destination_1 does not exist or already dropped');
    }

    console.log('✅ All indexes dropped successfully');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

dropIndexes();
