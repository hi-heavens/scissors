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

async function createURL(req, res) {
    const url = req.body.url;
    const customName = req.body.custom || false;

    const regex = /^https?:\/\/([^/?#]+)(?:[/?#]|$)/i;
    const match = url.match(regex);
    const linkName = match && match[1];

    let name = req.body.name || linkName;

    if (!customName && (customName.length <= 3 || customName.length > 7)) {
        return res.status(400).json({
            status: "failed",
            message: "Custom name length must be between 4 and 7 characters"
        })
    }

    const exist = await URL.findOne({ linkId: customName });
    if (exist) {
        return res.status(409).json({
            status: "failed",
            message: "custom name already exists"
        })
    }
    const linkId = customName || nanoid(7);
    const newLink = `${req.hostname}:${process.env.PORT}${req.originalUrl}/${linkId}`;

    let savedURL = new URL({
        linkId,
        url,
        name,
        newLink,
    })
    try {
        savedURL = await savedURL.save();
    } catch (err) {
        return res.send({
            status: "failed",
            message: "An error was encountered! Please try again."
        });
    }
    res.json({
        status: "success",
        newLink
    });
}

async function validateURL(req, res, next) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({
            status: "failed",
            message: "Missing required parameter(s)"
        })
    };

    const isValid = validator.isURL(url);
    if (isValid) {
        next();
    } else {
        res.status(400).json({
            status: "failed",
            message: "Bad request",
        })
    }
}
/**
    const isExist = await urlExist(url);
    if (!isExist) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid URL",
        });
    }
*/

export { createURL, validateURL };
