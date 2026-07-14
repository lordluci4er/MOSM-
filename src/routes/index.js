const express = require("express");

const router = express.Router();

// Auth
router.use("/auth", require("../modules/auth/routes/auth.routes"));

// Profile
router.use("/profile", require("../modules/profile/routes/profile.routes"));

// Medicines
router.use("/medicines", require("../modules/medicines/routes/medicine.routes"));

// Parties
router.use("/parties", require("../modules/parties/routes/party.routes"));

// Orders
router.use("/orders", require("../modules/orders/routes/order.routes"));

module.exports = router;