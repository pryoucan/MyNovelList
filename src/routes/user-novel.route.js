import { Router } from "express";
import 
{ 
    addNovel, deleteNovel, editNovel, getUserNovel, searchNovelByName, viewNovel
} 
from "../controllers/user-novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const userNovelRouter = Router();

userNovelRouter.get("/", userAuthentication, viewNovel);
userNovelRouter.get("/:novelId", userAuthentication, getUserNovel)
userNovelRouter.get("/search/:name", userAuthentication, searchNovelByName);
userNovelRouter.post("/:novelId", userAuthentication, addNovel);
userNovelRouter.patch("/:novelId", userAuthentication, editNovel);
userNovelRouter.delete("/:novelId", userAuthentication, deleteNovel);

export { userNovelRouter };