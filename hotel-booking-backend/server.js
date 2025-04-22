const express = require('express');
const dotenv = require('dotenv').config(); // Load environment variables
const cors = require('cors'); // Import cors
const connectDB = require('./config/database'); // Import database connection
const authRoutes = require('./routes/auth.routes'); // Import authentication routes
const roomRoutes = require('./routes/room.routes'); // Import room routes
const bookingRoutes = require('./routes/booking.routes'); // Import booking routes
const { errorHandler } = require('./middleware/errorMiddleware'); // Import custom error handler (see below)
const morgan = require('morgan'); // Import morgan for logging (optional)

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port, default to 3000

connectDB(); // Connect to MongoDB

// **Middleware**

// CORS Configuration (Important)
const corsOptions = {
    origin: '*', // Allow all origins (for development) - IMPORTANT: Change in production!
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies (if needed, usually not for RN)
    optionsSuccessStatus: 204, // Some legacy browsers need this
};
app.use(cors(corsOptions));

app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log HTTP requests (optional, but helpful for debugging)

// **Routes**
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/rooms', roomRoutes); // Room routes
app.use('/api/bookings', bookingRoutes); // Booking routes

// **Error Handling Middleware (Crucial)**
app.use(errorHandler); // Use custom error handler

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// **Socket.IO Setup (If you need real-time)**
const socketIO = require('socket.io')(server, {
    cors: {
        origin: '*', // Allow all origins (for development) - IMPORTANT: Change in production!
        methods: ['GET', 'POST'],
    },
});
const bookingSockets = require('./sockets/bookingSockets');
bookingSockets(socketIO);