const repository = require("../repositories/profile.repository");

exports.getProfile = async (firebaseUid) => {
    return repository.findByFirebaseUid(firebaseUid);
};

exports.updateProfile = async (firebaseUid, data) => {
    return repository.updateByFirebaseUid(firebaseUid, {
        medicalName: data.medicalName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        profileCompleted: true,
    });
};