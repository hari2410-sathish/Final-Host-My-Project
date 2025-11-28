const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: parseInt(process.env.SMTP_PORT || '587', 10),
secure: false,
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS,
},
});


async function sendMail(to, subject, text, html) {
return transporter.sendMail({
from: process.env.EMAIL_FROM,
to,
subject,
text,
html,
});
}


module.exports = { sendMail };