// routes/room.routes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Protect these routes, only admins can access
router.route('/')
    .post(protect, admin, roomController.createRoom) // Create room (admin only)
    .get(roomController.getAllRooms); // Get all rooms (public)

router.route('/:id')
    .get(roomController.getRoomById) // Get room by ID (public)
    .put(protect, admin, roomController.updateRoom) // Update room (admin only)
    .delete(protect, admin, roomController.deleteRoom); // Delete room (admin only)

module.exports = router;