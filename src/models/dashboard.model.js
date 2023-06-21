import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  message: {
    required: [true, 'Please provide a valid message'],
    type: String,
    unique: true
  },
  qrCodeBlob: {
    type: Buffer,
    required: true,
  },
});

const qrCode = mongoose.model("qrCode", qrCodeSchema);

export { qrCode };
