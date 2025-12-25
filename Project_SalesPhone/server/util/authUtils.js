const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1d' };
    return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
};