const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const routes = require("./routes");
const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(compression());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Endpoint
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to MOSM Backend 🚀",
        version: "1.0.0",
    });
});

// Health Check
app.get("/api/v1/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "MOSM Backend is healthy",
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
    });
});

// API Routes
app.use("/api/v1", routes);

// Global Error Handler (Always Last)
app.use(errorMiddleware);

module.exports = app;