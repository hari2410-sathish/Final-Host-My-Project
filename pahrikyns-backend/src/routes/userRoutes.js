const express = require("express");
const router = express.Router();

/* -------------------- AUTH (Login / Register) -------------------- */
const {
  registerUser,
  loginUser
} = require("../controllers/userAuthController");

/* -------------------- USER PROFILE -------------------- */
const {
  getCurrentUser,
  updateProfile,
  changePassword
} = require("../controllers/userProfileController");

/* -------------------- USER PROGRESS -------------------- */
const {
  getMyCourses,
  getCourseProgress
} = require("../controllers/userProgressController");

/* -------------------- OTP -------------------- */
const {
  sendUserOTP,
  verifyUserOTP,
  resendUserOTP
} = require("../controllers/userOtpController");

/* -------------------- MIDDLEWARE -------------------- */
const auth = require("../middlewares/authMiddleware");

/* ========================= PUBLIC ROUTES ========================= */
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/send-otp", sendUserOTP);
router.post("/verify-otp", verifyUserOTP);
router.post("/resend-otp", resendUserOTP);

/* ========================= PROTECTED ROUTES ========================= */
router.get("/me", auth, getCurrentUser);
router.put("/update-profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);

router.get("/my-courses", auth, getMyCourses);
router.get("/course-progress", auth, getCourseProgress);

module.exports = router;
