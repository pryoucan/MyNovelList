import { Router } from "express";
import { searchNovel, viewNovels } from "../controllers/global-novel.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { novelAddRequestSchema } from "../validators/novel-add-request.validator.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";
import { novelAddRequest } from "../controllers/novel-add-request.controller.js";

export const novelRouter = Router();

novelRouter.get("/novel/view", viewNovels);

novelRouter.get("/novel/search", searchNovel);

novelRouter.post("/novel/addrequests", validate(novelAddRequestSchema),
    userAuthentication, novelAddRequest);
