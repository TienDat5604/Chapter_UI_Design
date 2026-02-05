const express = require('express');
const router = express.Router();
const User = require('../models/User');

// List users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index', { title: 'User Management', users });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add user
router.post('/add', async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/users');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
