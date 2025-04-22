// booking.controller.js

const Booking = require('../models/booking.model');

exports.createBooking = async (req, res) => {
    const {
        room,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        totalPrice,
        fullName,
        email,
        phone
    } = req.body;

    try {
        const booking = await Booking.create({
            user: req.user._id,
            room,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            totalPrice,
            fullName,
            email,
            phone,
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').populate('room', 'name price');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('room', 'name price');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Complex Feature: Check Room Availability
exports.checkAvailability = async (req, res) => {
    const { roomId, checkInDate, checkOutDate } = req.query;
    try {
        const conflictingBookings = await Booking.find({
            room: roomId,
            $or: [
                { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } },
            ],
        });
        res.json({ isAvailable: conflictingBookings.length === 0, conflictingBookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }p
};