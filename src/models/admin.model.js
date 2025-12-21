import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.toJSON = function () {
    const admin = this.toObject();
    delete admin.password;
    return admin;
}

export const Admin = mongoose.model("Admin", adminSchema);