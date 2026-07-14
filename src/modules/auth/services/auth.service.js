const repository = require("../../profile/repositories/profile.repository");

exports.login = async (firebaseUser) => {
    let user = await repository.findByFirebaseUid(firebaseUser.uid);

    if (!user) {
        user = await repository.create({
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.name || "",
            photoURL: firebaseUser.picture || "",
        });
    }

    return user;
};