const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const errorMiddleware = require("./shared/middleware/error.middleware");


const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use(errorMiddleware);

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "MOSM Backend is healthy",
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
    });
});

module.exports = app;