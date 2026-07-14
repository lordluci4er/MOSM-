const service = require("../services/auth.service");

const {
    asyncHandler,
    success,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.login = asyncHandler(async (req, res) => {
    const user = await service.login(req.user);

    return success(
        res,
        MESSAGES.LOGIN_SUCCESS,
        user,
        HTTP_STATUS.OK
    );
});

exports.me = asyncHandler(async (req, res) => {
    return success(
        res,
        MESSAGES.AUTHENTICATED_USER,
        req.user,
        HTTP_STATUS.OK
    );
});