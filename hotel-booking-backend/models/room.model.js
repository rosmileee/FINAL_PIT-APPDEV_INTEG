// models/room.model.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    details: { type: String },
    price: { type: Number, required: true },
    amenities: [String],
    capacity: { type: Number },
    // Add other room-related fields
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);