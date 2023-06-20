import validator from "validator";
import { User } from "../../models/user.model.js";
import { getToken, decodeToken } from "../../utils/token.utils.js";
import  catchAsync  from "../../utils/catchAsync.error.js";

export const validateUser = catchAsync(async function (req, res, next) {
    const requestHandler = req.headers.authorization;

    const decode = await decodeToken(requestHandler);
    const loginUser = await User.findById(decode.id);
    if (!loginUser) {
        return next(new AppError("The user could not be found", 401));
    }
    req.user = loginUser;
    next();
});

async function signUp(req, res, next) {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
        return res.status(401).json({
            status: "failed",
            message: "Kindly reconfirm registration details and try again"
        })
    }
    const user = new User({
        user_name,
        email,
        password
    });
    const newUser = await user.save();

    const token = getToken(newUser._id);

    res.status(201).json({
        status: "successfully registered",
        token,
        data: {
            userId: newUser.id,
            userName: newUser.user_name,
            email: newUser.email,
            userName: newUser.user_name,
        }
    });
 }

async function login(req, res, next) {
    const { loginInput, password } = req.body;
    
    if (!loginInput || !password) {
        return res.status(400).json({
            status: "failed",
            message: "Please provide a valid username/email and/or password."
        })
    }
    
    let user;
    if (validator.isEmail(loginInput)) {
        user = await User.findOne({email: loginInput}).select("+password");
    } else {
        user = await User.findOne({user_name: loginInput}).select("+password");
    }

    if (!user || !(await user.validPassword(password, user.password))) {
        return res.status(401).json({
            status: "failed",
            message: "Incorrect username/email and/or password"
        })
    }

    let token = getToken(user._id);
    res.status(200).json({
        status: "login success",
        token,
        data: {
            userId: user.id,
            userName: user.user_name,
            email: user.email,
            userName: user.user_name,
        }
    })
};

export { signUp, login };
