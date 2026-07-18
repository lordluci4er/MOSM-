import express from "express";

import healthRoutes from "./modules/health/health.routes";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

export default app;