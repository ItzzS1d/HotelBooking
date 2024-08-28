import { Request, Response } from "express";
import User from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ error: "All fields are required" });
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ error: "User already exists" });

    const newUser = await User.create({ firstName, lastName, email, password });
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000, // 24 hours
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ error: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ userId: user.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("auth_token", { expires: new Date(0) });
  return res.status(200).json({ message: "Logged out successfully" });
};

export const verifyToken = async (req: Request, res: Response, next: any) => {
  const token = req.cookies["auth_token"];
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decodedToken)
    return res.status(401).json({ error: "Not authenticated" });

  req.userId = (decodedToken as JwtPayload).userId;
  next();
};
