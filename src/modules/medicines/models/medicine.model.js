const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },

        status: {
            type: String,
            enum: [
                "INBOX",
                "PENDING",
                "RECEIVED",
            ],
            default: "INBOX",
        },

        partyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Party",
            default: null,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "medicines",
    }
);

medicineSchema.index(
    {
        firebaseUid: 1,
        name: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "Medicine",
    medicineSchema
);