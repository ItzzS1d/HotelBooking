import mongoose from "mongoose";

export type hotelsType = {
  _id: string;
  userId: {};
  name: string;
  city: string;
  country: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  description: string;
  images: string[];
  starRating: number;
  lastUpdated: Date;
};

const hotelSchema = new mongoose.Schema<hotelsType>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String }],
    pricePerNight: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    starRating: { type: Number, required: true, min: 1, max: 5 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Hotel = mongoose.model<hotelsType>("Hotel", hotelSchema);

export default Hotel;
