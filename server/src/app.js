import express from'express';
import cors from 'cors';
import { connectRedis } from "./config/redis.js";
const app = express();
import "./workers/solve.worker.js";
await connectRedis();
app.use(cors());

app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import passport from "./config/passport.js";
app.use(passport.initialize());

import authRoutes from "./modules/auth/auth.route.js";
app.use("/api/v1/auth", authRoutes);

import problemRoutes from "./modules/problems/problems.route.js";
app.use("/api/v1/problems", problemRoutes);

import revisionRoutes from "./modules/revision/revision.route.js";
app.use("/api/v1/revision", revisionRoutes);

import progressRoutes from "./modules/progress/progress.route.js";
app.use("/api/v1/progress", progressRoutes);

export default app;