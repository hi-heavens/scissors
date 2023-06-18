import express from "express";
import compression from "compression";
import { shortenerRouter } from "./routes/shortener/shortener.router.js";
import { getUrlRouter } from "./routes/getUrl.route.js";
import { userRouter } from "./routes/users/users.router.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

const app = express();

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use('/', getUrlRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/shortener', shortenerRouter);

app.all("*", (req, res) => {
    res.send(`The ${req.method} route ${req.originalUrl} does not exist! 💨`);
});

app.use(globalErrorHandler);

export { app };
