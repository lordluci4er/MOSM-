const { body, query } = require("express-validator");

const createOrderValidation = [
    body("medicineId")
        .notEmpty()
        .withMessage("Medicine is required")
        .isMongoId()
        .withMessage("Invalid medicine id"),

    body("partyId")
        .notEmpty()
        .withMessage("Party is required")
        .isMongoId()
        .withMessage("Invalid party id"),

    body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

    body("notes")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Notes must not exceed 500 characters"),
];

const getOrdersValidation = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),

    query("partyId")
        .optional()
        .isMongoId()
        .withMessage("Invalid party id"),

    query("status")
        .optional()
        .isIn(["PENDING", "RECEIVED"])
        .withMessage("Invalid order status"),
];

module.exports = {
    createOrderValidation,
    getOrdersValidation,
};