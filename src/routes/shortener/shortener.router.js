import express from "express";
import { createURL, validateURL, validateUser } from "./shortener.controller.js";
const shortenerRouter = express.Router();

shortenerRouter.post('/', validateURL, validateUser, createURL);

export { shortenerRouter };
