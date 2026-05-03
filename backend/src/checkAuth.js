require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const checkAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sairam-jewels');
    console.log('Connected to DB');

    const user = await User.findOne({ email: 'constance@sterling.com' });
    if (!user) {
      console.log('User not found');
      process.exit(1);
    }

    console.log('User found:', user.email);
    console.log('Stored hashed password:', user.password);

    const isMatch = await user.matchPassword('password123');
    console.log('Does password123 match?:', isMatch);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkAuth();