import express from "express";
import dbConnectivity from "./config/db.config.js";
import router from "./routes/user-route.js"
import dotenv from 'dotenv';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

app.use('/api', router);

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