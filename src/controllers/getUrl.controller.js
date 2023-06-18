import { URL } from "../models/shortener.model.js";

async function getURL(req, res) {
    const id = req.params.id;

    const link = await URL.findOne({ id });

    if (!link) {
        return res.status(404).send({
            status: "failed",
            message: "Couldn't find the requested URL",
        });
    }
    res.send({ status: "success", message: link.url });
}

export { getURL };
