// controllers/room.controller.js
const Room = require('../models/room.model');

exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};