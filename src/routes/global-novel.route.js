import { Router } from "express";
import { searchNovel, viewNovel } from "../controllers/global-novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { novelAddRequestValidator } from "../validators/novel-add-request.validator.js";
import { novelAddRequest } from "../controllers/novel-add-request.controller.js";
import { approveRequest, rejectRequest, viewRequest } from "../controllers/admin-novel.controller.js";


<<<<<<< HEAD:src/routes/global-novel.route.js
const globalNovelRouter = Router();

globalNovelRouter.get("/", viewNovel);
globalNovelRouter.get("/:q", searchNovel);
globalNovelRouter.post("/add", 
=======
const novelRouter = Router();

novelRouter.get("/", viewNovel);
novelRouter.get("/:q", searchNovel);
novelRouter.post("/add", 
>>>>>>> e649d7f (improve api routes and endpoint, add improve controllers):routes/global-novel.route.js
    userAuthentication,
    validate(novelAddRequestValidator),
    novelAddRequest
);

<<<<<<< HEAD:src/routes/global-novel.route.js
globalNovelRouter.get("/view/request", userAuthentication, viewRequest);
globalNovelRouter.delete("/approve/request/:novelId", userAuthentication, approveRequest);
globalNovelRouter.delete("/reject/request/:novelId", userAuthentication, rejectRequest);


export { globalNovelRouter };
=======
novelRouter.get("/view/request", userAuthentication, viewRequest);
novelRouter.delete("/approve/request/:novelId", userAuthentication, approveRequest);
novelRouter.delete("/reject/request/:novelId", userAuthentication, rejectRequest);


export { novelRouter };
>>>>>>> e649d7f (improve api routes and endpoint, add improve controllers):routes/global-novel.route.js
