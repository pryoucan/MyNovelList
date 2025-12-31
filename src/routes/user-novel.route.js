import { Router } from "express";
import 
{ 
    addUserNovel, deleteUserNovel, 
    editUserNovel, 
    getUserNovelById, 
    getUserNovelByName,
    viewUserNovel, 
} 

from "../controllers/user-novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const userNovelRouter = Router();

userNovelRouter.get("/", userAuthentication, async (req, res) => {
    if(req.query.n) {
        return getUserNovelByName(req, res);
    }
    return viewUserNovel(req, res);
});

userNovelRouter.get("/:novelId", userAuthentication, getUserNovelById)
userNovelRouter.post("/:novelId", userAuthentication, addUserNovel);
userNovelRouter.patch("/:novelId", userAuthentication, editUserNovel);
userNovelRouter.delete("/:novelId", userAuthentication, deleteUserNovel);

export { userNovelRouter };