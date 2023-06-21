import express from "express";
import { validateUser } from "../users/users.controller.js";
import { generateQRCode } from "./qrcode.controller.js";

const qrcodeRouter = express.Router();

qrcodeRouter.post('/', validateUser, generateQRCode);

export { qrcodeRouter };
