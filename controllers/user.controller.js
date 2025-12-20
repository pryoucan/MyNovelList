import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {

  const existingUserByEmail = await User.findOne({ email: req.body.email });
  if (existingUserByEmail) {
    return res.status(400).json({
      message: "User already exists, log in instead"
    });
  }

  const existingUserByUsername = await User.findOne({ username: req.body.username });
  if (existingUserByUsername) {
    return res.status(400).json({
      message: "Username already in use"
    });
  }

  try {
    const user = await User.create(req.body);
    return res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const loginUser = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await user.matchPassword(req.body.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        message: "User logged in successfully",
        token
      });
    }
    else {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
  }
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
