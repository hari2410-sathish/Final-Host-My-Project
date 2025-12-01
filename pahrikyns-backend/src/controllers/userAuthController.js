const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../helpers/generateOTP");

/* REGISTER USER */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.tempUser.upsert({
      where: { email },
      update: { name, password: hashed },
      create: { name, email, password: hashed },
    });

    await prisma.otpStore.deleteMany({ where: { email } });

    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({ message: "OTP sent", requiresOTP: true, email });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/* LOGIN */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    res.json({ message: "Login successful", token, user: safeUser });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
