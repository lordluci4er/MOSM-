const express = require("express");

const router = express.Router();

const controller = require("../controllers/profile.controller");

const authMiddleware = require("../../../shared/middleware/auth.middleware");
const validate = require("../../../shared/middleware/validation.middleware");

const {
    updateProfileValidation,
} = require("../validations/profile.validation");

router.get("/", authMiddleware, controller.getProfile);

router.put(
    "/",
    authMiddleware,
    updateProfileValidation,
    validate,
    controller.updateProfile
);

module.exports = router;