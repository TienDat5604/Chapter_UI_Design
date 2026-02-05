const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const User = require('../models/User');
const Booking = require('../models/Booking');

router.get('/', async (req, res) => {
    try {
        const carCount = await Car.countDocuments();
        const userCount = await User.countDocuments();
        const bookingCount = await Booking.countDocuments();
        const recentBookings = await Booking.find().populate('userId carId').sort({ createdAt: -1 }).limit(5);

        res.render('index', {
            title: 'Dashboard',
            stats: { carCount, userCount, bookingCount },
            recentBookings
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
