import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
await connectCloudinary();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("GHS API IS WORKING..");
});
app.use("/api/admin", adminRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
