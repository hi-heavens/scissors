import validator from "validator";
import urlExist from "url-exist";
import { nanoid } from "nanoid";
import { URL } from "../../models/shortener.model.js";
import { decodeToken } from "../../utils/token.utils.js";
import { User } from "../../models/user.model.js";
import { AppError } from "../../utils/app.error.js";
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

export const createURL = catchAsync(async function (req, res, next) {
    const url = req.body.url;
    const customName = req.body.custom || false;

    const regex = /^https?:\/\/([^/?#]+)(?:[/?#]|$)/i;
    const match = url.match(regex);
    const linkName = match && match[1];

    let name = req.body.name || linkName;

    if (!customName && (customName.length <= 3 || customName.length > 7)) {
        return next(new AppError("Custom name length must be between 4 and 7 characters", 400));
    }

    const exist = await URL.findOne({ linkId: customName });
    if (exist) {
        return next(new AppError("Custom name already exists", 409));
    }
    const linkId = customName || nanoid(7);
    const userId = req.user._id;
    const newLink = `${req.protocol}://${req.hostname}:${process.env.PORT}/${linkId}`;

    let savedURL = new URL({
        linkId,
        url,
        name,
        newLink,
        userId,
    })
    try {
        savedURL = await savedURL.save();
    } catch (err) {
        return next(new AppError("An error was encountered! Please try again.", 500));
    }
    return res.json({
        status: "success",
        newLink
    });
});

export const validateURL = catchAsync(async function (req, res, next) {
// async function validateURL(req, res, next) {
    const { url } = req.body;
    if (!url) {
        return next(new AppError("Missing required parameter(s)", 400));
    };

    const isValid = validator.isURL(url);
    if (isValid) {
        next();
    } else {
        return next(new AppError("Invalid URL/Bad request", 400));
    }
});
/**
    const isExist = await urlExist(url);
    if (!isExist) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid URL",
        });
    }
*/

export const getLinks = catchAsync(async function (req, res, next) {
    const loginUser = await URL.find({userId: req.user._id}).select("namd url newLink");
    return res.json({
        status: "found",
        message: loginUser
    });
});
