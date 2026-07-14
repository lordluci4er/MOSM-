const { error } = require("../responses/apiResponse");

module.exports = (err, req, res, next) => {
    console.error(err);

    return error(
        res,
        err.message || "Internal Server Error",
        err.errors || [],
        err.statusCode || 500
    );
};