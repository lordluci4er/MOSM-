const service = require("../services/profile.service");

const {
    asyncHandler,
    success,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.getProfile = asyncHandler(async (req, res) => {
    const profile = await service.getProfile(req.user.uid);

    return success(
        res,
        MESSAGES.PROFILE_FETCHED,
        profile,
        HTTP_STATUS.OK
    );
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const profile = await service.updateProfile(
        req.user.uid,
        req.body
    );

    return success(
        res,
        MESSAGES.PROFILE_UPDATED,
        profile,
        HTTP_STATUS.OK
    );
});