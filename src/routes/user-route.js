import { Router } from "express";
import { registerUser } from "../controllers/auth-user.controller.js";
import { loginUser } from "../controllers/auth-user.controller.js";
import { searchNovel } from "../controllers/novel.controller.js";
import { createNovel } from "../controllers/novel.controller.js";
import { deleteNovel } from "../controllers/novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const router = Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/novel/search").get(userAuthentication, searchNovel);
router.route("/novel/create").post(userAuthentication, createNovel);
router.route("/novel/delete/:novelId").delete(userAuthentication, deleteNovel);

export default router;