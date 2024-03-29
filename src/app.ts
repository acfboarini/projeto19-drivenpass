import express, { json } from "express";
import cors from "cors";
import router from "./routers/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);

export default app;