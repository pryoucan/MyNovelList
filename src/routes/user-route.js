import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { editNovel, searchNovel, viewNovel } from "../controllers/novel.controller.js";
import { createNovel } from "../controllers/novel.controller.js";
import { deleteNovel } from "../controllers/novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

router.get("/novels", userAuthentication, viewNovel);
router.get("/novels", userAuthentication, searchNovel);
router.post("/novels", userAuthentication, createNovel);
router.patch("/novels/:novelId", userAuthentication, editNovel);
router.delete("/novels/:novelId", userAuthentication, deleteNovel);

export default router;