import express from "express";
import { getURL } from "../controllers/getUrl.controller.js";

const getUrlRouter = express.Router();

getUrlRouter.get('/:id', getURL);

export { getUrlRouter };
