const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth.controller");
const authMiddleware = require("../../../shared/middleware/auth.middleware");

router.post("/login", authMiddleware, controller.login);

router.get("/me", authMiddleware, controller.me);

module.exports = router;