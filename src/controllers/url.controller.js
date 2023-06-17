import validator from "validator";
import urlExist from "url-exist";
import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

async function postURL(req, res) {
    const { url, custom } = req.body;

    if (custom && (custom.length > 7 || custom.length <= 1)) {
        return res.status(400).json({
            status: "failed",
            message: "invalid custom name length"
        })
    }

    const exist = await URL.findOne({ id: custom });
    if (exist) {
        return res.status(409).json({
            status: "failed",
            message: "custom name already exists"
        })
    }
    const id = custom || nanoid(7);

    let savedURL = new URL({
        id,
        url
    })
    try {
        savedURL = await savedURL.save();
    } catch (err) {
        return res.send({
            status: "An error was encountered! Please try again."
        });
    }
    res.json({
        status: "success",
        message: `http://127.0.0.1:${process.env.PORT}/${savedURL.id}`
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

export { postURL, validateURL };
