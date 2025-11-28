import User from "../models/user-model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(password.toString().length < 8) {
      return res.status(400).json({ 
        message: "Password must be atleast 8 characters long" 
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const userData = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return res
      .status(201)
      .json({ message: "User registeration success", userData });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {   
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {
        expiresIn: "1d",
      });

      return res.status(201).json({ message: "Login Successfull", token: token });
    } 
    else {
      return res.status(400).json({ message: "Invalid email address or password" });
    }
  } 
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};
