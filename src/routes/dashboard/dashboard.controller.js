import catchAsync from "../../utils/catchAsync.error.js";
import { URL } from "../../models/shortener.model.js";

export const dashBoard = catchAsync(async function (req, res, next) {
  const userId = req.user._id.toString();
  const dashboardDetails = await URL.find({ userId }).select("-linkId -_id -__v");

  res.json({
    status: "success",
    message: dashboardDetails,
  });
});
