import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  linkId: {
    required: true,
    type: String,
    unique: true
  },
  url: {
    required: [true, 'Please provide a valid URL'],
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Please provide a valid name'],
  },
  newLink: {
    type: String,
  },
  userId: {
    type: String,
    required: [true, 'Please provide a valid user ID'],
  }
});

const URL = mongoose.model("URL", urlSchema);

export { URL };
