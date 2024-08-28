import express from "express";
import multer from "multer";
import { createhotel } from "../controller/hotelsController";
import { verifyToken } from "../controller/userController";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5MB

router.post(
  "/create-hotel",
  verifyToken,
  upload.array("imageFiles", 6),
  createhotel
);

export default router;
