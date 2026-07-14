const mongoose = require("mongoose");

const partySchema = new mongoose.Schema(
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

        phoneNumber: {
            type: String,
            default: "",
            trim: true,
        },

        address: {
            type: String,
            default: "",
            trim: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "parties",
    }
);

partySchema.index(
    {
        firebaseUid: 1,
        name: 1,
    },
    {
        unique: true,
    }
);

partySchema.index({
    firebaseUid: 1,
    isDeleted: 1,
});

module.exports = mongoose.model("Party", partySchema);