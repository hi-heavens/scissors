import { qrCode } from "../../models/qrcode.model.js";
import catchAsync from "../../utils/catchAsync.error.js";
import { AppError } from "../../utils/app.error.js";
import QRCode from "qrcode";

export const generateQRCode = catchAsync(async function (req, res, next) {
  const { message } = req.body;
  if (!message) {
    return next(new AppError("Please provide a message/link to code", 400));
  }

  let qrCodeBlob;
  // Check if QR code already exists
  const findQRCode = await qrCode.findOne({ message });
  if (findQRCode) {
    qrCodeBlob = findQRCode.qrCodeBlob;
  } else {
    // Generate QR code as Blob
    qrCodeBlob = await QRCode.toBuffer(message, {
      width: 300,
      height: 300,
    });
    // Save QR code in MongoDB
    const code = new qrCode({
      message,
      qrCodeBlob,
    });
    await code.save();
  }
  res.set({
    "Content-Disposition": 'attachment; filename="qrcode.png"',
    "Content-Type": "image/png",
  });
  console.log("QR Code generated successfully");
  res.send(qrCodeBlob);
});
