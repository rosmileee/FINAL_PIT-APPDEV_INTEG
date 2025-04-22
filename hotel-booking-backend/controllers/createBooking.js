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
    } = req.body; // Included fullName, email, and phone in the destructuring

    try {
        const booking = await Booking.create({
            user: req.user._id,
            room,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            totalPrice,
            fullName, // Now these fields will be saved
            email,
            phone,
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};