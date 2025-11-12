import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    imageUrl: String,
    stars: {
        type: Number,
        min: 1,
        max: 5,
    },
    category: String,
}, { timestamps: true }); // agrega createdAt y updatedAt automáticamente

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);