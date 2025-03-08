const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); 

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/auth/login');
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };