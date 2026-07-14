const express = require("express");

const router = express.Router();

const controller = require("../controllers/order.controller");

const authMiddleware = require("../../../shared/middleware/auth.middleware");
const validate = require("../../../shared/middleware/validation.middleware");

const {
    createOrderValidation,
    getOrdersValidation,
} = require("../validations/order.validation");

router.post(
    "/",
    authMiddleware,
    createOrderValidation,
    validate,
    controller.createOrder
);

router.get(
    "/",
    authMiddleware,
    getOrdersValidation,
    validate,
    controller.getOrders
);

router.get(
    "/:id",
    authMiddleware,
    controller.getOrder
);

router.patch(
    "/:id/receive",
    authMiddleware,
    controller.receiveOrder
);

router.patch(
    "/:id/return",
    authMiddleware,
    controller.returnOrder
);

module.exports = router;