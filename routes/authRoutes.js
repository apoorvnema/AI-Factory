const express = require('express');
const { registerController, loginController, logoutController, getUserByEmail } = require('../controllers/authController');

// router object
const router = express.Router();

// routes
// REGISTER
router.post('/register', registerController)

// LOGIN
router.post('/login', loginController)

// LOGOUT
router.post('/logout', logoutController)

// Get Username by Email Address Route
router.get('/users/:email', getUserByEmail, (req, res) => {
    const { username } = req.user;
    res.json({ username });
});

module.exports = router;