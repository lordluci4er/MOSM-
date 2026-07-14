const express = require("express");

const router = express.Router();

const controller = require("../controllers/medicine.controller");

const authMiddleware = require("../../../shared/middleware/auth.middleware");
const validate = require("../../../shared/middleware/validation.middleware");

const {
    medicineValidation,
    getMedicinesValidation,
} = require("../validations/medicine.validation");

router.post(
    "/",
    authMiddleware,
    medicineValidation,
    validate,
    controller.createMedicine
);

router.get(
    "/",
    authMiddleware,
    getMedicinesValidation,
    validate,
    controller.getMedicines
);

router.get(
    "/:id",
    authMiddleware,
    controller.getMedicine
);

router.put(
    "/:id",
    authMiddleware,
    medicineValidation,
    validate,
    controller.updateMedicine
);

router.delete(
    "/:id",
    authMiddleware,
    controller.deleteMedicine
);

module.exports = router;