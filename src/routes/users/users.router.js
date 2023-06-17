import express from "express";
import { signUp } from "./users.controller.js";

const userRouter = express.Router();

userRouter.post('/signup', signUp);
// router.post('/login', userController.login);

export { userRouter };
