const Profile = require("../models/profile.model");

exports.findById = (id) => {
    return Profile.findById(id);
};

exports.findByFirebaseUid = (firebaseUid) => {
    return Profile.findOne({ firebaseUid });
};

exports.create = (data) => {
    return Profile.create(data);
};

exports.updateById = (id, data) => {
    return Profile.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};