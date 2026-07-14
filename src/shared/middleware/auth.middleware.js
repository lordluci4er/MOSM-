const auth = require("../config/firebase");
const { error, HTTP_STATUS, MESSAGES } = require("../");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return error(
                res,
                "Authorization header missing",
                [],
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        if (!authHeader.startsWith("Bearer ")) {
            return error(
                res,
                "Invalid authorization format",
                [],
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const token = authHeader.split(" ")[1];

        const decodedToken = await auth.verifyIdToken(token);

        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || "",
            picture: decodedToken.picture || "",
        };

        next();
    } catch (err) {
        return error(
            res,
            MESSAGES.UNAUTHORIZED,
            [],
            HTTP_STATUS.UNAUTHORIZED
        );
    }
};