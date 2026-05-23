const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leaveBalance: {
    annual: { type: Number, default: 20 },
    sick: { type: Number, default: 12 },
    casual: { type: Number, default: 10 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
