import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  url: {
    required: [true, 'Please provide a valid URL'],
    type: String,
  },
});

const URL = mongoose.model("URL", urlSchema);

export { URL };
