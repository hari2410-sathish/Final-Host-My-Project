const jwt = require('jsonwebtoken');
require('dotenv').config();


function generateToken(payload, expiresIn = '1d') {
return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn });
}


module.exports = generateToken;