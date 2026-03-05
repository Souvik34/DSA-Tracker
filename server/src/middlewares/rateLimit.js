import rateLimit from "express-rate-limit";


export const authLimiter =  rateLimit({
    windowMs: 15 * 60 * 1000, 
    max:20,
    message: "Too many requests, please try again after 15 minutes"
})