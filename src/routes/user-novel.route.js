import { Router } from "express";
import { addNovel, deleteNovel, editNovel, searchNovel, viewNovel } from "../controllers/user-novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const userNovelRouter = Router();

userNovelRouter.get("/view", userAuthentication, viewNovel);
userNovelRouter.get("/search/:q", userAuthentication, searchNovel);
userNovelRouter.post("/add/:novelId", userAuthentication, addNovel);
userNovelRouter.patch("/update", userAuthentication, editNovel);
userNovelRouter.delete("/delete", userAuthentication, deleteNovel);

export { userNovelRouter };