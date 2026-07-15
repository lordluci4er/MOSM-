const repository = require("../../profile/repositories/profile.repository");

exports.login = async (firebaseUser) => {
    try {
        console.log("========== LOGIN ==========");
        console.log("Firebase User:", firebaseUser);

        if (!firebaseUser) {
            throw new Error("firebaseUser is undefined");
        }

        console.log("Searching user by UID:", firebaseUser.uid);

        let user = await repository.findByFirebaseUid(firebaseUser.uid);

        console.log("Existing User:", user);

        if (!user) {
            console.log("Creating User...");

            const payload = {
                firebaseUid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.name || "",
                photoURL: firebaseUser.picture || "",
            };

            console.log("Payload:", payload);

            user = await repository.create(payload);

            console.log("Created User:", user);
        }

        return user;
    } catch (e) {
        console.error("🔥 AUTH SERVICE ERROR");
        console.error(e);
        console.error(e.stack);

        throw e;
    }
};