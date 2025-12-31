import { User } from "../models/user.model";
import { otpGenerator } from "../utils/otp-generator";
import { redis } from "../utils/redis";




export const saveOtpInRedis = async (req, res, next) => {
    const saveEmail = req.user.email;
    const saveOtp = otpGenerator(6, 35);
    console.log(saveOtp);
    const key = `otp:${saveEmail}`;

    try {
        redis.set(key, `${saveOtp}`);
        redis.expire(otp, 600);
        if(!redis.exists(key)) {
            return res.status(404).json({ message: "OTP is exprired" });
        } 

        const getOtp = redis.get(key);
        req.user = { otp: getOtp };
        next();
    }
    catch(error) {
        console.log("Somethin went wrong", error);
    }
};