import jwt from "jsonwebtoken";
import { promisify } from "util";

function getToken(user_id) {
    return jwt.sign({id: user_id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
}

async function decodeToken(receivedToken) {
    let token = "";
    if (receivedToken && receivedToken.startWith("Bearer")) {
        token = receivedToken.split(" ")[1];
    }
    if (!token) {
        res.status(401).json({
            status: "failed",
            message: "You are not logged in. Kindly log in for access"
        })
    }

    return await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
}

export { getToken, decodeToken };
