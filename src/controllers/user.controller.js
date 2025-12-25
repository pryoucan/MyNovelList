import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { otpGenerator } from "../Utils/otp-generator.js";

const registerUser = async (req, res) => {
  try {
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

const loginUser = async (req, res) => {
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

const resetPassword = async (req, res) => {
  const { otp } = req.body;
  const ogOTP = req.otp;

  if (otp !== ogOTP) {
    return res.status(400).json({ message: "OTP is incorrect" });
  }
  try {
    let newUserPassword = req.body;
    const userEmail = req.user.email;
    const userId = req.user.id;

    const user = await Novel.findOne({ email: userEmail, user: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchNewAndOldPassword = user.matchPassword(newUserPassword);
    if (matchNewAndOldPassword) {
      return res.status(400).json({
        message: "New password cannont be the same as old one"
      });
    }

    newUserPassword = await bcrypt.hash(newUserPassword, 10);

    const updatedPassword = await Novel.findOneAndUpdate(
      {
        email: userEmail, userPassword: password, user: userId
      },
      {
        password: newUserPassword
      },
      {
        new: true
      }
    ).lean();

    return res.status(201).json({ message: "Password updated successfully" });
  }
  catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export { registerUser, loginUser, resetPassword };