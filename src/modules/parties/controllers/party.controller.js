const service = require("../services/party.service");

const {
    asyncHandler,
    success,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.createParty = asyncHandler(async (req, res) => {
    const party = await service.createParty(
        req.user.uid,
        req.body
    );

    return success(
        res,
        MESSAGES.PARTY_CREATED,
        party,
        HTTP_STATUS.CREATED
    );
});

exports.getParties = asyncHandler(async (req, res) => {
    const parties = await service.getParties(
        req.user.uid,
        req.query
    );

    return success(
        res,
        MESSAGES.PARTIES_FETCHED,
        parties,
        HTTP_STATUS.OK
    );
});

exports.getParty = asyncHandler(async (req, res) => {
    const party = await service.getPartyById(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        MESSAGES.PARTY_FETCHED,
        party,
        HTTP_STATUS.OK
    );
});

exports.updateParty = asyncHandler(async (req, res) => {
    const party = await service.updateParty(
        req.user.uid,
        req.params.id,
        req.body
    );

    return success(
        res,
        MESSAGES.PARTY_UPDATED,
        party,
        HTTP_STATUS.OK
    );
});

exports.deleteParty = asyncHandler(async (req, res) => {
    const party = await service.deleteParty(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        MESSAGES.PARTY_DELETED,
        party,
        HTTP_STATUS.OK
    );
});