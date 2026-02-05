const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Car name is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    model: {
        type: String,
        required: [true, 'Model is required']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Price per day is required'],
        min: [0, 'Price must be positive']
    },
    status: {
        type: String,
        enum: ['available', 'rented', 'maintenance'],
        default: 'available'
    },
    image: {
        type: String,
        default: '/images/default-car.png'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
