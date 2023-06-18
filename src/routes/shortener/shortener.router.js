import express from "express";
import { createURL, validateURL } from "./shortener.controller.js";
const shortenerRouter = express.Router();

shortenerRouter.post('/', validateURL, createURL);

export { shortenerRouter };
