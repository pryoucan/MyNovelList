import { mongoose, Schema } from "mongoose";

const otpSchema = Schema({

    email: String,
    otp: String,
    expiresAt: Date

}, { timestamps: true} );

export const Otp = mongoose.model("Otp", otpSchema);