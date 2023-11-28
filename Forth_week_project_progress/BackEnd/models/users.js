import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Additional fields for user profile
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  achievements: {
    type: String,
  },
  link: {
    type: String,
  },
  otp: {
    type: String,
  },
  // ... (other fields remain the same)
}, { timestamps: true });

userSchema.index({ firstName: 'text', lastName: 'text' }); // Index the 'firstName' and 'lastName' fields for text search

export default mongoose.model('User', userSchema);
