const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../helpers/generateOTP");


// ===================================================
// REGISTER USER (Step 1) → Create Temp user + Send OTP
// ===================================================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    // If already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Store temp user
    await prisma.tempUser.upsert({
      where: { email },
      update: { name, password: hashed },
      create: { name, email, password: hashed },
    });

    // Clear previous OTP
    await prisma.otpStore.deleteMany({ where: { email } });

    // Generate & Send OTP
    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    res.json({
      message: "OTP sent",
      requiresOTP: true,
      email,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


// ===================================================
// LOGIN USER → Create session
// ===================================================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ error: "Invalid password" });

    // SAVE SESSION
    req.session.userId = user.id;

    res.json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


// ===================================================
// GET CURRENT USER (Protected)
// ===================================================
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


// ===================================================
// UPDATE PROFILE (Protected)
// ===================================================
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email },
    });

    res.json({
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};


// ===================================================
// CHANGE PASSWORD (Protected)
// ===================================================
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok)
      return res.status(400).json({ error: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    res.json({ message: "Password changed successfully" });

  } catch (err) {
    res.status(500).json({ error: "Failed to change password" });
  }
};


// ---------------------------------------------------
// FUTURE APIs (You can add later)
// ---------------------------------------------------
exports.getMyCourses = async (req, res) => {
  res.json([]);
};

exports.getCourseProgress = async (req, res) => {
  res.json([]);
};
