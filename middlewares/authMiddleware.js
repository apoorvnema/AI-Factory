// authMiddleware.js

const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        // No access token provided
        return res.status(401).json({ error: 'Unauthorized Access with status code 401' });
    }

    const accessToken = authorizationHeader.split(' ')[1]; // Extract the token from the Authorization header
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Your access token is expired please login again' });
    }
};

module.exports = isAuthenticated;
