import "./bootstrap.js";

import dbConnectivity from "./config/db.config.js";

import express from "express";
import cors from "cors";

import { authRouter } from "./routes/auth.route.js";
import { novelRouter } from "./routes/novel.route.js";
import { userNovelRouter } from "./routes/user-novel.route.js";

const app = express();

app.disable("etag");

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://verdant-bubblegum-d63144.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/novels", novelRouter);
app.use("/api/users/novels", userNovelRouter);

const runServer = async () => {
    try {
        await dbConnectivity();
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
};

runServer();