const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// List bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId carId');
        res.render('bookings/index', { title: 'Booking Management', bookings });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
// Add booking form
router.get('/add', async (req, res) => {
    try {
        const selectedCarId = req.query.carId; // Lấy carId từ URL nếu có

        // Hiển thị FULL tất cả các xe có trong hệ thống, không lọc bất kỳ trạng thái nào
        const cars = await Car.find();
        const users = await User.find();

        console.log(`Debug: Found ${cars.length} cars and ${users.length} users for booking form`);

        res.render('bookings/add', {
            title: 'New Booking',
            cars,
            users,
            selectedCarId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Add booking logic
router.post('/add', async (req, res) => {
    try {
        const { carId, userId, startDate, endDate, status } = req.body;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).send('Không tìm thấy xe');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // 1. Kiểm tra ngày kết thúc phải sau ngày bắt đầu
        if (end <= start) {
            return res.status(400).send('Ngày kết thúc phải sau ngày bắt đầu');
        }



        // 3. Tính tổng tiền
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = days * car.pricePerDay;

        // 4. Tạo booking mới
        await Booking.create({
            userId,
            carId,
            startDate: start,
            endDate: end,
            totalPrice,
            status: status || 'pending'
        });

        // 5. Cập nhật trạng thái xe
        // Nếu booking bắt đầu từ hôm nay hoặc sớm hơn, và chưa kết thúc, đánh dấu là 'rented'
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (start <= today && end > today) {
            await Car.findByIdAndUpdate(carId, { status: 'rented' });
        }

        res.redirect('/bookings');
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;
