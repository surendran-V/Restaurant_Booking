// backend/src/routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings or bookings for a specific date
router.get('/', bookingController.getBookings);

// Delete a booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;