import { URL } from "../models/shortener.model.js";
import { AppError } from "../utils/app.error.js";
import catchAsync from "../utils/catchAsync.error.js";

export const getURL = catchAsync(async function (req, res, next) {
  const linkId = req.params.id;
  const link = await URL.findOne({ linkId });

  if (!link) {
    return next(new AppError("Couldn't find the requested URL", 404));
  }
  if (req.originalUrl !== linkId) {
    await URL.findOneAndUpdate({ linkId }, { $inc: { clicks: 1 } });
  }
  res.redirect(link.url);
});
