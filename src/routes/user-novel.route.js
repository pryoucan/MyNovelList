import { Router } from "express";
import 
{ 
    addUserNovel, deleteUserNovel, editUserNovel, 
    getUserNovel, searchUserNovelByName, viewUserNovel
} 

from "../controllers/user-novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const userNovelRouter = Router();

userNovelRouter.get("/", userAuthentication, viewUserNovel);
userNovelRouter.get("/:novelId", userAuthentication, getUserNovel)
userNovelRouter.get("/search/:name", userAuthentication, searchUserNovelByName);
userNovelRouter.post("/:novelId", userAuthentication, addUserNovel);
userNovelRouter.patch("/:novelId", userAuthentication, editUserNovel);
userNovelRouter.delete("/:novelId", userAuthentication, deleteUserNovel);

export { userNovelRouter };