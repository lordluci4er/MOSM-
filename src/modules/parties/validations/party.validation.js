const { body, query } = require("express-validator");

const partyValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Party name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Party name must be between 2 and 100 characters"),

    body("phoneNumber")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Phone number must not exceed 20 characters"),

    body("address")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Address must not exceed 255 characters"),
];

const getPartiesValidation = [
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
];

module.exports = {
    partyValidation,
    getPartiesValidation,
};