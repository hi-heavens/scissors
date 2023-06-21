import express from "express";
import compression from "compression";
import cors from "cors";
import { shortenerRouter } from "./routes/shortener/shortener.router.js";
import { getUrlRouter } from "./routes/getUrl.route.js";
import { userRouter } from "./routes/users/users.router.js";
import { qrcodeRouter } from "./routes/qrcodes/qrcode.router.js";
import rateLimiter from "./utils/rate.limit.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use('/', getUrlRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/shortener', shortenerRouter);
app.use('/api/v1/qrcode', rateLimiter, qrcodeRouter);
app.use('/api/v1/dashboard', qrcodeRouter);

app.all("*", (req, res) => {
    res.send(`The ${req.method} route ${req.originalUrl} does not exist! 💨`);
});

app.use(globalErrorHandler);

export { app };
