const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: true,
            index: true,
        },

        medicineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine",
            required: true,
        },

        partyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Party",
            required: true,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        status: {
            type: String,
            enum: ["PENDING", "RECEIVED"],
            default: "PENDING",
        },

        receivedAt: {
            type: Date,
            default: null,
        },

        receivedBy: {
            type: String,
            default: null,
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "orders",
    }
);

// One active pending order per medicine
orderSchema.index(
    {
        firebaseUid: 1,
        medicineId: 1,
        status: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            status: "PENDING",
            isDeleted: false,
        },
    }
);

// Fast Party Screen
orderSchema.index({
    firebaseUid: 1,
    partyId: 1,
    status: 1,
});

// Fast User Queries
orderSchema.index({
    firebaseUid: 1,
    isDeleted: 1,
});

module.exports = mongoose.model("Order", orderSchema);