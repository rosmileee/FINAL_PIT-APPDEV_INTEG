module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected via WebSocket');

        socket.on('newBooking', (bookingData) => {
            // In a real application, you would save the booking to the database here
            console.log('New booking received:', bookingData);
            // Emit a 'bookingUpdated' event to all connected clients
            io.emit('bookingUpdated', bookingData);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected from WebSocket');
        });
    });
};