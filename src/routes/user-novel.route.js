import { Router } from "express";
<<<<<<< HEAD:src/routes/user-novel.route.js
import { addNovel, deleteNovel, editNovel, searchNovel, viewNovel } from "../controllers/user-novel.controller.js";
=======
import 
{ 
    addNovel, deleteNovel, editNovel, getUserNovel, searchNovelByName, viewNovel
} 
from "../controllers/user-novel.controller.js";
>>>>>>> e649d7f (improve api routes and endpoint, add improve controllers):routes/user-novel.route.js
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const userNovelRouter = Router();

<<<<<<< HEAD:src/routes/user-novel.route.js
userNovelRouter.get("/view", userAuthentication, viewNovel);
userNovelRouter.get("/search/:q", userAuthentication, searchNovel);
userNovelRouter.post("/add/:novelId", userAuthentication, addNovel);
userNovelRouter.patch("/update", userAuthentication, editNovel);
userNovelRouter.delete("/delete", userAuthentication, deleteNovel);
=======
userNovelRouter.get("/", userAuthentication, viewNovel);
userNovelRouter.get("/:novelId", userAuthentication, getUserNovel)
userNovelRouter.get("/search/:name", userAuthentication, searchNovelByName);
userNovelRouter.post("/:novelId", userAuthentication, addNovel);
userNovelRouter.patch("/:novelId", userAuthentication, editNovel);
userNovelRouter.delete("/:novelId", userAuthentication, deleteNovel);
>>>>>>> e649d7f (improve api routes and endpoint, add improve controllers):routes/user-novel.route.js

export { userNovelRouter };