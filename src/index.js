import express from "express";
import dbConnectivity from "./config/db.config.js";
import dotenv from 'dotenv';
import cors from "cors";
import { authRouter } from "./routes/auth.route.js";
import { globalNovelRouter } from "./routes/global-novel.route.js";
import { userNovelRouter } from "./routes/user-novel.route.js";
import { User } from "./models/user.model.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/novels", globalNovelRouter);
app.use("/api/users/novels", userNovelRouter);

const runServer = async () => {
    try {
        await dbConnectivity();
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
};

runServer();