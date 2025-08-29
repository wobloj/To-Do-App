import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "./config/passport";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import shoppingRoutes from "./routes/shopping";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: (process.env.CLIENT_URL as string), credentials: true }));
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/shopping", shoppingRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

export default app;