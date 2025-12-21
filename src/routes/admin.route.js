import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { loginAdminSchema, registerAdminSchema } from "../validators/admin.validator.js";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import { adminAuthentication } from "../middlewares/auth-admin.middleware.js";
import { viewRequests, approveRequests, rejectRequests } from "../controllers/admin-novel.controller.js";

const adminRouter = Router();

adminRouter.post("/register",
    validate(registerAdminSchema),
    registerAdmin);

adminRouter.post("/login",
    validate(loginAdminSchema),
    loginAdmin);

adminRouter.get("/novel/viewrequests", adminAuthentication, viewRequests);

adminRouter.get("/novel/approverequests/:novelID", adminAuthentication, approveRequests);

adminRouter.delete("/novel/rejectrequests/:novelID", adminAuthentication, rejectRequests);

export { adminRouter };