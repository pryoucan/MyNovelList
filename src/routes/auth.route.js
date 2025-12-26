import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user-auth.controller.js";
import { registerUserSchema, loginUserSchema } from "../validators/user.validator.js";
import { validate } from "../middlewares/validator.middleware.js";


const authRouter = Router();

authRouter.post("/register", validate(registerUserSchema), registerUser);
authRouter.post("/login", validate(loginUserSchema), loginUser);

export { authRouter };