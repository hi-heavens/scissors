import express from "express";
import { postURL, validateURL } from "../controllers/url.controller.js";

const urlRouter = express.Router();

urlRouter.post('/', validateURL, postURL);

export { urlRouter };
