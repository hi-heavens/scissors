import rateLimit from "express-rate-limit";
import { AppError } from "./app.error.js";

const rateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 2 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: "Too many requests, please try again later.",
});

export default rateLimiter;
