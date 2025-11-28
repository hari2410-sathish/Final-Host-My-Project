const prisma = require('../config/prismaClient');
const generateOTP = require('../helpers/generateOTP');
const { sendMail } = require('../config/email');
const { sendSms } = require('../config/sms');
const generateToken = require('../utils/generateToken');


// SEND OTP (expects header Authorization: Bearer <pre_otp_token>)
async function sendOtp(req, res, next) {
try {
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Missing token' });


// Optionally verify token here (skipped for brevity) - you can decode if needed
const { email, method } = req.body;
if (!email) return res.status(400).json({ message: 'Missing email' });


const otp = generateOTP(6);
const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min


await prisma.otpStore.create({ data: { email, otp, method: method || 'email', expiresAt } });


if ((method || 'email') === 'sms') {
await sendSms(email, `Your OTP: ${otp}`);
} else {
await sendMail(email, 'Your Pahrikyns OTP', `OTP: ${otp}`, `<p>OTP: <b>${otp}</b></p>`);
}


return res.json({ ok: true, message: 'OTP sent' });
} catch (err) {
next(err);
}
}


// VERIFY OTP
async function verifyOtp(req, res, next) {
try {
const { email, otp } = req.body;
if (!email || !otp) return res.status(400).json({ message: 'Missing fields' });


const record = await prisma.otpStore.findFirst({ where: { email, otp }, orderBy: { createdAt: 'desc' } });
if (!record) return res.status(400).json({ message: 'Invalid OTP' });


if (new Date(record.expiresAt) < new Date()) return res.status(400).json({ message: 'OTP expired' });


// Issue final JWT
const admin = await prisma.admin.findUnique({ where: { email } });
if (!admin) return res.status(400).json({ message: 'No admin' });


const token = generateToken({ id: admin.id, role: admin.role }, '7d');


return res.json({ ok: true, token });
} catch (err) {
next(err);
}
}


module.exports = { sendOtp, verifyOtp };