import jwt from "jsonwebtoken";

function getToken(user_id) {
    return jwt.sign({id: user_id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
}

export { getToken };
