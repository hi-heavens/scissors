import express from "express";
import { getURL } from "./get.url.controller.js";

const getUrlRouter = express.Router();

getUrlRouter.get('/:id', getURL);

export { getUrlRouter };
