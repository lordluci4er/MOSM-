const { body, query } = require("express-validator");

const medicineValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Medicine name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Medicine name must be between 2 and 100 characters"),
];

const getMedicinesValidation = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),

    query("search")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Search must not exceed 100 characters"),

    query("status")
        .optional()
        .isIn(["INBOX", "PENDING", "RECEIVED"])
        .withMessage("Invalid medicine status"),
];

module.exports = {
    medicineValidation,
    getMedicinesValidation,
};