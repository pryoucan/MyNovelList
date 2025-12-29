import { Router } from "express";
import { searchNovel, viewNovel } from "../controllers/global-novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { novelAddRequestValidator } from "../validators/novel-add-request.validator.js";
import { novelAddRequest } from "../controllers/novel-add-request.controller.js";
import { approveRequest, rejectRequest, viewRequest } from "../controllers/admin-novel.controller.js";


const novelRouter = Router();

novelRouter.get("/", viewNovel);
novelRouter.get("/:q", searchNovel);
novelRouter.post("/add", 
    userAuthentication,
    validate(novelAddRequestValidator),
    novelAddRequest
);

novelRouter.get("/view/request", userAuthentication, viewRequest);
novelRouter.delete("/approve/request/:novelId", userAuthentication, approveRequest);
novelRouter.delete("/reject/request/:novelId", userAuthentication, rejectRequest);


export { novelRouter };
