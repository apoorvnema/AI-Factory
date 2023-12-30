const userModel = require('../models/userModel')
const errorResponse = require('../utils/errorResponse');

// JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
    const tokens = user.getSignedToken(res);
    const expirationTimeInMinutes = parseInt(process.env.JWT_ACCESS_EXPIREIN, 10) || 15; // Default: 15 minutes
    const expirationTimeInSeconds = expirationTimeInMinutes * 60;
    const expirationTimeInMilliseconds = expirationTimeInSeconds * 1000;
    const expirationTime = Date.now() + expirationTimeInMilliseconds;
    res.status(statusCode).json({
        success: true,
        token: tokens.accessToken,
        expirationTime: expirationTime,
    });
};

// REGISTER
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Existing user
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            throw new errorResponse('Email is already registered', 500)
        }
        const user = await userModel.create({
            username,
            email,
            password,
        });
        this.sendToken(user, 201, res);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

// LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new errorResponse('Please provide email and password', 400);
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new errorResponse('Verify your email address and password and try again', 401);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new errorResponse('Verify your email address and password and try again', 401);
        }
        this.sendToken(user, 200, res);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

// Get Username by email address
exports.getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Pass the user object to the next middleware or send it in the response
        req.user = user;

        // Continue to the next middleware or send a response
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// LOGOUT
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully',
    });
}