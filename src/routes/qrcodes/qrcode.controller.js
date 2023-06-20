import { qrCode } from "../../models/qrcode.model.js";
import catchAsync from "../../utils/catchAsync.error.js";
import { AppError } from "../../utils/app.error.js";
import QRCode from "qrcode";

export const generateQRCode = catchAsync(async function (req, res, next) {
  try {
    const { message } = req.body;
    if (!message) {
      return next(new AppError("Please provide a message to code", 400));
    }

    // Generate QR code as Blob
    const qrCodeBlob = await QRCode.toBuffer(message, {
      width: 300,
      height: 300,
    });

    // Save QR code in MongoDB
    const code = new qrCode({
      message,
      qrCodeBlob,
    });
    const collection = await code.save();
    res.set("Content-Disposition", 'attachment; filename="qrcode.png"');
    res.set("Content-Type", "image/png");
    console.log("QR Code generated successfully");
    res.send(qrCodeBlob);
  } catch (error) {
    return next(new AppError("Internal server error", 500));
  }
});
