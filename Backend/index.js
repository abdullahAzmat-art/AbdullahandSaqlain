import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors"
import dbconnection from "./DbIntegration/dbconnection.js";
import userRouter from "./Routers/Userrouter.js";
import path from "path";
import { fileURLToPath } from "url";
import router from "./Routers/Jobdesigningroute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

dbconnection();


app.use("/api/v1" , userRouter)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))
app.use("/api/v1" , router)

const port  = process.env.PORT || 6600

app.listen(port, () => console.log(`the server is running on port ${port}`));
