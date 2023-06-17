import express from "express";
import compression from "compression";
import { urlRouter } from "./routes/url.route.js";
import { getUrlRouter } from "./routes/getUrl.route.js";
import { userRouter } from "./routes/users/users.router.js";

const app = express();

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use('/', getUrlRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/shortener', urlRouter);

app.all("*", (req, res) => {
    res.send(`The ${req.method} route ${req.originalUrl} does not exist! 💨`);
});

export { app };
