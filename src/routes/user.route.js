import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { loginUserSchema, registerUserSchema } from "../validators/user.validator.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";


export const userRouter = Router();

userRouter.post("/user/register", validate(registerUserSchema), registerUser);
userRouter.post("/user/login", validate(loginUserSchema), loginUser);