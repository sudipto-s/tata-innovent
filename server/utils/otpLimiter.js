import rateLimit from "express-rate-limit"

const otpLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 5, // Limit each IP to 5 OTP requests per windowMs
   message: { message: "Too many OTP requests from this IP, please try again after 15 minutes." }
});

export default otpLimiter