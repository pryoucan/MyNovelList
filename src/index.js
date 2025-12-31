import "./bootstrap.js";

import express from "express";
import cors from "cors";

import dbConnectivity from "./config/db.config.js";
import { authRouter } from "./routes/auth.route.js";
import { novelRouter } from "./routes/global-novel.route.js";
import { userNovelRouter } from "./routes/user-novel.route.js";
import { transporter } from "./config/mail-transporter.config.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/novels", novelRouter);
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