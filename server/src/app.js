import express from'express';
import cors from 'cors';

const app = express();
app.use(cors());


import cookieParser from "cookie-parser";
app.use(cookieParser());

import authRoutes from "./modules/auth/auth.routes.js";
app.use("/api/v1/auth", authRoutes);

export default app;