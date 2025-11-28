const prisma = require('../config/prismaClient');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


async function adminLogin(req, res, next) {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });


const admin = await prisma.admin.findUnique({ where: { email } });
if (!admin) return res.status(401).json({ message: 'Invalid credentials' });


const match = await bcrypt.compare(password, admin.password);
if (!match) return res.status(401).json({ message: 'Invalid credentials' });


// Return a pre-OTP token (stage: pre-otp)
const token = generateToken({ id: admin.id, stage: 'pre-otp' }, '10m');


return res.json({ ok: true, next: 'otp', token });
} catch (err) {
next(err);
}
}


module.exports = { adminLogin };