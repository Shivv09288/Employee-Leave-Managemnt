const mongoose = require('mongoose');
require('dotenv').config();

const updateLeaveBalance = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Update all users to have the new leave balance structure
    const result = await mongoose.connection.db.collection('users').updateMany(
      {},
      {
        $set: {
          'leaveBalance.annual': 20,
          'leaveBalance.sick': 12,
          'leaveBalance.casual': 10
        },
        $unset: {
          'leaveBalance.sickLeave': '',
          'leaveBalance.casualLeave': '',
          'leaveBalance.vacation': ''
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} users with new leave balance structure`);
    console.log('\n📊 New Leave Balance for all users:');
    console.log('   - Annual Leave: 20 days');
    console.log('   - Sick Leave: 12 days');
    console.log('   - Casual Leave: 10 days');

    // Show updated users
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log('\n👥 Updated Users:');
    users.forEach(user => {
      console.log(`\n   ${user.name} (${user.email})`);
      console.log(`   - Annual: ${user.leaveBalance.annual || 0} days`);
      console.log(`   - Sick: ${user.leaveBalance.sick || 0} days`);
      console.log(`   - Casual: ${user.leaveBalance.casual || 0} days`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
};

updateLeaveBalance();
