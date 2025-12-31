import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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


// const resetPassword = async (req, res) => {
//   const { otp } = req.body;
//   const ogOTP = req.otp;

//   if (otp !== ogOTP) {
//     return res.status(400).json({ message: "OTP is incorrect" });
//   }
//   try {
//     let newUserPassword = req.body;
//     const userEmail = req.user.email;
//     const userId = req.user.id;

//     const user = await Novel.findOne({ email: userEmail, user: userId });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const matchNewAndOldPassword = user.matchPassword(newUserPassword);
//     if (matchNewAndOldPassword) {
//       return res.status(400).json({
//         message: "New password cannont be the same as old one"
//       });
//     }

//     newUserPassword = await bcrypt.hash(newUserPassword, 10);

//     const updatedPassword = await Novel.findOneAndUpdate(
//       {
//         email: userEmail, userPassword: password, user: userId
//       },
//       {
//         password: newUserPassword
//       },
//       {
//         new: true
//       }
//     ).lean();

//     return res.status(201).json({ message: "Password updated successfully" });
//   }
//   catch (error) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }

export { registerUser, loginUser };