const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({ // Define the schema for the User model
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  profile: {
    name: String,
    age: Number,
    height: Number, // in cm
    weight: Number, // in kg
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    profilePicture: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// We have to has so that we don't store the password in plain text

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10); // Salt is a random string that is used to hash the password
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Method to check password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare the entered password with the hashed password
};

module.exports = mongoose.model('User', UserSchema); // Export the User model

// The password is hashed before saving it to the database. 
// The matchPassword method is used to compare the entered password with the hashed password. 
// This ensures that the password is securely stored and verified. 
// The User model is exported for use in other parts of the application.