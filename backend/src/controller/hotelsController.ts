import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { hotelsType } from "../models/hotelsModel";
export const createhotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: hotelsType = req.body;
    // 1.upload the images to cloud storage
    const uploadPromises = imageFiles.map(async (img) => {
      const b64 = Buffer.from(img.buffer).toString("base64");
      let dataURI = `data:${img.mimetype};base64,${b64}`;
      const res = await cloudinary.uploader.upload(dataURI, {
        folder: "hotels",
      });
      return res.url;
    });
    const imgURLS = await Promise.all(uploadPromises);
    // 2. save the URLs in the newHotel
    newHotel.images = imgURLS;
    newHotel.userId = req.userId;
    newHotel.lastUpdated = new Date() as Date;

    // 3. save the newHotel to the database
    const hotel = new Hotel(newHotel);
    await hotel.save();
    return res.status(201).json({ hotel });
  } catch (error) {
    console.log("error in creating hotel", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
