import { Router } from "express";
import { registerUser } from "../controllers/auth-user.controller.js";
import { loginUser } from "../controllers/auth-user.controller.js";
import { searchNovel } from "../controllers/novel.controller.js";
import { createNovel } from "../controllers/novel.controller.js";
import { deleteNovel } from "../controllers/novel.controller.js";
import { userAuthentication } from "../middlewares/auth-user.middleware.js";

const router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

router.get("/novels", userAuthentication, searchNovel);
router.post("/novels", userAuthentication, createNovel);
router.delete("/novels/:novelId", userAuthentication, deleteNovel);

export default router;