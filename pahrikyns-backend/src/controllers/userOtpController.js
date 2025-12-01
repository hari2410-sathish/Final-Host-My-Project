const prisma = require("../config/prismaClient");
const { sendOTPEmail } = require("../helpers/generateOTP");
const bcrypt = require("bcryptjs");


// ===================================================
// SEND USER OTP  (Already sent in registerUser also)
// ===================================================
exports.sendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    // Clear old OTP
    await prisma.otpStore.deleteMany({ where: { email } });

    // Send new OTP
    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      },
    });

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};



// ===================================================
// VERIFY USER OTP
// ===================================================
exports.verifyUserOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Missing OTP data" });

    // Find OTP
    const otpRecord = await prisma.otpStore.findFirst({
      where: { email },
    });

    if (!otpRecord)
      return res.status(400).json({ error: "OTP not found" });

    if (otpRecord.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    // Get TEMP user
    const tempUser = await prisma.tempUser.findUnique({
      where: { email },
    });

    if (!tempUser)
      return res.status(400).json({ error: "User not found in TempUser" });

    // Move TempUser -> User table
    const user = await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
        isVerified: true,
      },
    });

    // Cleanup
    await prisma.tempUser.delete({ where: { email } });
    await prisma.otpStore.deleteMany({ where: { email } });

    // CREATE SESSION
    req.session.userId = user.id;

    res.json({
      message: "OTP verified successfully",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "OTP Verification failed" });
  }
};



// ===================================================
// RESEND OTP
// ===================================================
exports.resendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    // Delete previous OTP
    await prisma.otpStore.deleteMany({ where: { email } });

    // Send new OTP
    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({ message: "OTP resent!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
};
