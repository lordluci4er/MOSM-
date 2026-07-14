const { body } = require("express-validator");

exports.updateProfileValidation = [
    body("medicalName")
        .trim()
        .notEmpty()
        .withMessage("Medical name is required"),

    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),
];