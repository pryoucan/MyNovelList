import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user-auth.controller.js";
import { registerUserValidator, loginUserValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validator.middleware.js";


const authRouter = Router();

authRouter.post("/register", validate(registerUserValidator), registerUser);
authRouter.post("/login", validate(loginUserValidator), loginUser);

export { authRouter };