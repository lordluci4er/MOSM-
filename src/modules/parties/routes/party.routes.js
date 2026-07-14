const express = require("express");

const router = express.Router();

const controller = require("../controllers/party.controller");

const authMiddleware = require("../../../shared/middleware/auth.middleware");
const validate = require("../../../shared/middleware/validation.middleware");

const {
    partyValidation,
    getPartiesValidation,
} = require("../validations/party.validation");

router.post(
    "/",
    authMiddleware,
    partyValidation,
    validate,
    controller.createParty
);

router.get(
    "/",
    authMiddleware,
    getPartiesValidation,
    validate,
    controller.getParties
);

router.get(
    "/:id",
    authMiddleware,
    controller.getParty
);

router.put(
    "/:id",
    authMiddleware,
    partyValidation,
    validate,
    controller.updateParty
);

router.delete(
    "/:id",
    authMiddleware,
    controller.deleteParty
);

module.exports = router;