import { User } from "../models/user.model.js";
import { redis } from "../config/redis.config.js";
import { otpGenerator } from "../utils/otp-generator.js";
import { transporter } from "../config/mail-transporter.config.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const registerUser = async (req, res) => {
  try {
    const { username, email, password, adminkey } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let role = "USER";

    if (adminkey) {
      if (adminkey !== process.env.ADMIN_KEY) {
        return res.status(403).json({ message: "Invalid admin key" });
      }
      role = "ADMIN";
    }

    const userData = await User.create({
      username,
      email,
      password,
      role
    });

    return res.status(201).json({ message: "Registration successfull", userData });
  }
  catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Something went wrong" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password, adminkey } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    if (user.role === "ADMIN") {
      if (!adminkey || adminkey !== process.env.ADMIN_KEY) {
        return res.status(403).json({ message: "Admin verification failed" });
      }
    }

    const token = await jwt.sign({ id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.username
    });

  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ ok: 200 });
    }

    const saveOtp = otpGenerator(6, 35);
    const otpToStore = await bcrypt.hash(saveOtp, 10);
    console.log(saveOtp);
    console.log(otpToStore);
    const key = `otp:${email}`;
    await redis.set(key, otpToStore, { ex: 600 });

    const otp = await redis.get(key);

    const info = await transporter.sendMail({
      from: `"MyNovelList" <${process.env.G_MAIL}>`,
      to: email,
      subject: "Your verification code",
      text: `Your OTP is ${saveOtp}. It expires in 10 minutes.`,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({ message: 
      `If you have an account, we have sent an verification code to ${email}`})
  }
  catch (error) {
    console.log(error)
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if(!email || !otp) {
    return res.status(400).json({ message: "Enter required fields" });
  }

  try {
    const key = `otp:${email}`
    const dbOtp = await redis.get(key);
    if(!(await bcrypt.compare(otp, dbOtp))) {
      return res.status(400).json({ message: "Invalid or expired otp" });
    }

    const user = await User.findOne({ email });
    if(!user) {
      res.status(404).json({ message: "User not found" });
    }

    const resetToken = await jwt.sign(
      { id: user._id,
        purpose: "reset_password"
      }, 
      process.env.JWT_SECRETKEY, 
      {
        expiresIn: "5m"
      }
    );

    await redis.del(key);

    return res.status(200).json({ message: "Otp verified", resetToken });
  }
  catch(error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}


const resetPassword = async (req, res) => {
  const { password } = req.body;
  if(!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(400).json({
        message: "New password cannot be same as the old one"
      });
    }

    const newPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      {
        _id: req.user.id
      },
      {
        password: newPassword
      },
      {
        new: true
      }
    );

    return res.status(201).json({ message: "Password updated successfully" });
  }
  catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword };