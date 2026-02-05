require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');
const User = require('./models/User');
const Booking = require('./models/Booking');

const seedData = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/CarRentalDB';
        await mongoose.connect(mongoURI);
        console.log('Connected to DB for seeding...');

        // Clear existing data
        await Car.deleteMany({});
        await User.deleteMany({});
        await Booking.deleteMany({});

        // Create Users
        const users = await User.create([
            { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'customer' },
            { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'owner' },
            { name: 'Admin User', email: 'admin@autorent.com', password: 'adminpassword', role: 'admin' }
        ]);

        // Create Cars
        const cars = await Car.create([
            { name: 'Tesla Model 3', brand: 'Tesla', model: '2023 Long Range', pricePerDay: 120, status: 'available' },
            { name: 'BMW M4', brand: 'BMW', model: '2022 Competition', pricePerDay: 250, status: 'available' },
            { name: 'Toyota Camry', brand: 'Toyota', model: '2021 Hybrid', pricePerDay: 60, status: 'available' },
            { name: 'Mercedes S-Class', brand: 'Mercedes', model: '2023 Luxury', pricePerDay: 350, status: 'maintenance' }
        ]);

        // Create a Booking
        await Booking.create({
            userId: users[0]._id,
            carId: cars[0]._id,
            startDate: new Date('2026-02-01'),
            endDate: new Date('2026-02-05'),
            totalPrice: 480,
            status: 'confirmed'
        });

        console.log('Data seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('SEED ERROR:', err.message);
        if (err.reason) console.error('REASON:', err.reason);
        process.exit(1);
    }
};

seedData();
