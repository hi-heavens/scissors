import express from "express";
import { getURL } from "../controllers/get.url.controller.js";

const getUrlRouter = express.Router();

getUrlRouter.get('/:id', getURL);

export { getUrlRouter };
