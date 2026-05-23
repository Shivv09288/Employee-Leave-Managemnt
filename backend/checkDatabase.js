const mongoose = require('mongoose');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!\n');

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections in database:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    console.log('');

    // Check Users collection
    const usersCount = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`👤 Total Users: ${usersCount}`);
    
    if (usersCount > 0) {
      const users = await mongoose.connection.db.collection('users').find({}).toArray();
      console.log('\n📋 Users in database:');
      users.forEach(user => {
        console.log(`   - Name: ${user.name}`);
        console.log(`     Email: ${user.email}`);
        console.log(`     Role: ${user.role}`);
        console.log(`     Created: ${user.createdAt}`);
        console.log('');
      });
    }

    // Check Leave Requests collection
    const leavesCount = await mongoose.connection.db.collection('leaverequests').countDocuments();
    console.log(`📝 Total Leave Requests: ${leavesCount}`);
    
    if (leavesCount > 0) {
      const leaves = await mongoose.connection.db.collection('leaverequests').find({}).toArray();
      console.log('\n📋 Leave Requests in database:');
      leaves.forEach(leave => {
        console.log(`   - Type: ${leave.leaveType}`);
        console.log(`     Status: ${leave.status}`);
        console.log(`     Start: ${leave.startDate}`);
        console.log(`     End: ${leave.endDate}`);
        console.log(`     Reason: ${leave.reason}`);
        console.log('');
      });
    }

    console.log('✅ Database check completed!');
    
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
};

checkDatabase();
