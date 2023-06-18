import jwt from "jsonwebtoken";
import { promisify } from "util";
import { AppError } from "./app.error.js";

function getToken(user_id) {
    return jwt.sign({id: user_id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
}

async function decodeToken(receivedToken) {
    let token = "";
    if (receivedToken && receivedToken.startsWith("Bearer")) {
        token = receivedToken.split(" ")[1];
    }
    if (!token) {
        throw new AppError("You are not logged in. Kindly log in for access", 401);
    }

    return await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
}

export { getToken, decodeToken };
