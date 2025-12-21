import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { novelAddRequestSchema } from "../validators/novel-add-request.validator.js";
import { novelAddRequest } from "../controllers/novel-add-request.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";
import { adminAuthentication } from "../middlewares/auth-admin.middleware.js";
import { approveRequests, viewRequests } from "../controllers/admin.controller.js";
import { globalNovelSchema } from "../validators/global-novel.validator.js";


export const novelRouter = Router();

novelRouter.post("/novel/addrequests", validate(novelAddRequestSchema),
    userAuthentication, novelAddRequest);

novelRouter.get("/novel/viewrequests/:adminID", adminAuthentication, viewRequests);

novelRouter.post("/novel/approverequests/:novelID", 
    validate(globalNovelSchema), approveRequests);
