const repository = require("../../profile/repositories/profile.repository");

exports.login = async (firebaseUser) => {
    try {
        console.log("========== LOGIN ==========");
        console.log("Firebase User:", firebaseUser);

        let user = await repository.findByFirebaseUid(firebaseUser.uid);

        console.log("Existing User:", user);

        if (!user) {
            console.log("Creating User...");

            user = await repository.create({
                firebaseUid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.name || "",
                photoURL: firebaseUser.picture || "",
            });

            console.log("Created User:", user);
        }

        return user;
    } catch (e) {
        console.error("🔥 AUTH SERVICE ERROR");
        console.error(e);
        throw e;
    }
};