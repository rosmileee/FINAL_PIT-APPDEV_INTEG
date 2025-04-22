const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, bookingController.createBooking).get(protect, bookingController.getAllBookings);
router.route('/:id').get(protect, bookingController.getBookingById).put(protect, bookingController.updateBooking).delete(protect, bookingController.deleteBooking);
router.get('/availability', bookingController.checkAvailability);

module.exports = router;