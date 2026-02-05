const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// List cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.render('cars/index', { title: 'Car Management', cars });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add car form
router.get('/add', (req, res) => {
    res.render('cars/add', { title: 'Add New Car' });
});

// Add car logic
router.post('/add', async (req, res) => {
    try {
        await Car.create(req.body);
        res.redirect('/cars');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Edit car form
router.get('/edit/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.render('cars/edit', { title: 'Edit Car', car });
    } catch (err) {
        res.status(404).send('Car not found');
    }
});

// Edit car logic
router.post('/edit/:id', async (req, res) => {
    try {
        await Car.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/cars');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete car
router.get('/delete/:id', async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.redirect('/cars');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
