import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { app } from "./src/app.js";
import { connectionToMongoDB } from "./src/config/database.js";

connectionToMongoDB();

const PORT = process.env.PORT || 3000;

console.log("Starting");

app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}...`);
});
