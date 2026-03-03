import express from'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import authRoutes from "./modules/auth/auth.route.js";
app.use("/api/v1/auth", authRoutes);

export default app;