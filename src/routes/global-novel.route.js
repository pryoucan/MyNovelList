import { Router } from "express";
import { searchNovel, viewNovel } from "../controllers/global-novel.controller.js";


const globalNovelRouter = Router();

globalNovelRouter.get("/", viewNovel);
globalNovelRouter.get("/novels/:q", searchNovel);


export { globalNovelRouter };