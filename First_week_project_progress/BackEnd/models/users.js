import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    city: {
        type: String,
    },
    mode: {
        type: String,
    },
    type: {
        type: String,
    },
    phone: {
        type: String,
    },
    achievements: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    link: {
        type: String,
    },
    // ... (other fields remain the same)
}, { timestamps: true });

userSchema.index({ name: 'text' }); // Index the 'name' field for text search

export default mongoose.model('User', userSchema);
