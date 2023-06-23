import express from "express";
import { validateUser } from "../users/users.controller.js";
import { dashBoard } from "./dashboard.controller.js";

const dasboardRouter = express.Router();

dasboardRouter.get('/', validateUser, dashBoard);

export { dasboardRouter };
