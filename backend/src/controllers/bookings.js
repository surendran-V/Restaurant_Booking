// backend/src/controllers/bookings.js
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    // Check if timeslot is available
    const existingBooking = await Booking.findOne({
      date: new Date(req.body.date),
      time: req.body.time
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Create new booking
    const booking = new Booking(req.body);
    await booking.save();
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating booking',
      error: error.message
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};
    
    if (date) {
      // If date is provided, get bookings for that date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.date = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    const bookings = await Booking.find(query).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).json({
      message: 'Error deleting booking',
      error: error.message
    });
  }
};