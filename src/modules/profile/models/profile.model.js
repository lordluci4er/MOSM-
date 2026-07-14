const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        displayName: {
            type: String,
            default: "",
        },

        photoURL: {
            type: String,
            default: "",
        },

        medicalName: {
            type: String,
            default: "",
        },

        phoneNumber: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

module.exports = mongoose.model("Profile", profileSchema);