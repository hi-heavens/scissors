import { User } from "../../models/user.model.js";
import { getToken } from "../../utils/token.utils.js";

async function signUp(req, res, next) {
    const { first_name, last_name, user_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(401).json({
            status: "failed",
            message: "Kindly reconfirm registration details and try again"
        })
    }
    const user = new User({
        first_name,
        last_name,
        user_name: user_name || "unknown",
        email,
        password
    });
    const newUser = await user.save();

    const token = getToken(newUser._id);

    res.status(201).json({
        status: "successfully registered",
        token,
        data: {
            user_id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            user_name: newUser.user_name,
        }
    });
 }

export { signUp };
