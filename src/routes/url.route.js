import express from "express";
import { postURL, validateURL } from "./shortener/shortener.controller.js";

const urlRouter = express.Router();

urlRouter.post('/', validateURL, postURL);

export { urlRouter };
