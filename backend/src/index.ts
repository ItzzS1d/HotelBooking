import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import hotelRoute from "./routes/hotelsRoute";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_PASS,
});

mongoose.connect(process.env.MONGO_URL as string);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);

app.listen(3000, () => {
  console.log("server started on 3000");
});
