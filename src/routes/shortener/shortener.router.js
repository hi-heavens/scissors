import express from "express";
import { createURL, validateURL, validateUser, getLinks } from "./shortener.controller.js";
const shortenerRouter = express.Router();

shortenerRouter.post('/', validateUser, validateURL, createURL);
shortenerRouter.get('/', validateUser, getLinks);

export { shortenerRouter };
