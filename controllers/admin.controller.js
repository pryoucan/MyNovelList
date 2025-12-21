import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const registerAdmin = async (req, res) => {

    const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
    if (existingAdminByEmail) {
        return res.status(400).json({
            message: "Admin already exists, log in instead"
        });
    }

    const existingAdminByUsername = await Admin.findOne({ username: req.body.username });
    if (existingAdminByUsername) {
        return res.status(400).json({
            message: "Username already in use"
        });
    }

    if (req.body.secret_key !== process.env.ADMIN_KEY) {
        return res.status(401).json({
            error: "Registeration denied"
        });
    }

    try {
        delete req.body.secret_key;
        const admin = await Admin.create(req.body);
        return res.status(201).json({
            message: "Admin registered successfull",
            admin
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

const loginAdmin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (admin.matchPassword(password))) {
            const token = await jwt.sign({ id: admin._id },
                process.env.JWT_SECRETKEY,
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                message: "Admin logged in successfully",
                token
            });
        }
        else {
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export { registerAdmin, loginAdmin }