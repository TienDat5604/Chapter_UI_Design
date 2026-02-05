require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'partials/layout');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoutes = require('./routes/index');
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

app.use('/', indexRoutes);
app.use('/cars', carRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
