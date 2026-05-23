const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Department = require('./models/Department');
const LeaveRequest = require('./models/LeaveRequest');

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/leave_management';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Department.deleteMany({});
    await LeaveRequest.deleteMany({});
    console.log('Cleared existing data');

    // Create departments (without managers - you'll add them manually)
    const departments = [];
    const departmentsData = [
      { name: 'Engineering', description: 'Software Development Team' },
      { name: 'Sales', description: 'Sales and Account Management' },
      { name: 'HR', description: 'Human Resources' }
    ];

    for (const data of departmentsData) {
      const dept = await Department.create(data);
      departments.push(dept);
      console.log(`Created department: ${dept.name}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Departments Created:');
    departmentsData.forEach(d => console.log(`  - ${d.name}: ${d.description}`));
    console.log('\n📝 Next Steps:');
    console.log('  1. Register new user accounts through the app');
    console.log('  2. Select your department during registration');
    console.log('  3. Create managers manually as needed');
    console.log('  4. Assign employees to managers after registration');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(() => {
  seedDatabase();
});
