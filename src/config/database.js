import mongoose from "mongoose";

const connectionToMongoDB = () => {
  mongoose.connect(process.env.MONGO_DB_URI);
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully...");
  });
  mongoose.connection.on("error", (err) => {
    console.log("An error occurred connecting to MongoDB...");
    console.log(err);
  });
};

export { connectionToMongoDB };
