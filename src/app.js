import express from "express";
import compression from "compression";
import cors from "cors";
import { shortenerRouter } from "./routes/shortener/shortener.router.js";
import { getUrlRouter } from "./routes/get.url.route.js";
import { userRouter } from "./routes/users/users.router.js";
import { qrcodeRouter } from "./routes/qrcodes/qrcode.router.js";
import { dasboardRouter } from "./routes/dashboard/dashboard.route.js";
import rateLimiter from "./utils/rate.limit.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use('/', getUrlRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/shortener', rateLimiter, shortenerRouter);
app.use('/api/v1/qrcode', rateLimiter, qrcodeRouter);
app.use('/api/v1/dashboard', dasboardRouter);

app.all("*", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/22961306/2s93z3h6mE');
    // res.send(`The ${req.method} route ${req.originalUrl} does not exist! 💨`);
});

app.use(globalErrorHandler);

export { app };
