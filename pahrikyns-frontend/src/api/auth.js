import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

/* ---------------------------------------------------------
   PUBLIC: REGISTER + LOGIN + OTP
---------------------------------------------------------- */

// USER REGISTER
export function registerUser(data) {
  return API.post("/auth/user/register", data);
}

// SEND OTP
export function sendOTP(data) {
  return API.post("/auth/user/send-otp", data);
}

// VERIFY OTP
export function verifyOTP(data) {
  return API.post("/auth/user/verify-otp", data);
}

// RESEND OTP
export function resendOTP(data) {
  return API.post("/auth/user/resend-otp", data);
}

// LOGIN
export function loginUser(data) {
  return API.post("/auth/user/login", data);
}

/* ---------------------------------------------------------
   PASSWORD RESET
---------------------------------------------------------- */

export function requestPasswordReset(data) {
  return API.post("/auth/user/request-reset", data);
}

export function resetPassword(data) {
  return API.post("/auth/user/reset-password", data);
}

/* ---------------------------------------------------------
   PROTECTED: CURRENT USER
---------------------------------------------------------- */
export function getCurrentUser(token) {
  return API.get("/auth/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default API;
