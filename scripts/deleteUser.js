const mongoose = require('mongoose');
const User = require('../backend/models/User');

const uri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/leave_management';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/deleteUser.js user@example.com');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    const res = await User.deleteOne({ email });
    console.log('Delete result:', res);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();
