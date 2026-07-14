const repository = require("../repositories/party.repository");

const {
    ApiError,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.createParty = async (firebaseUid, data) => {
    const partyName = data.name.trim().toUpperCase();

    const existingParty = await repository.findByName(
        firebaseUid,
        partyName
    );

    if (existingParty) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.PARTY_ALREADY_EXISTS
        );
    }

    return repository.create({
        firebaseUid,
        name: partyName,
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
    });
};

exports.getParties = async (
    firebaseUid,
    query = {}
) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;

    const filters = {
        page,
        limit,
        search: query.search || "",
    };

    const [items, total] = await Promise.all([
        repository.findAll(firebaseUid, filters),
        repository.count(firebaseUid, filters),
    ]);

    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

exports.getPartyById = async (
    firebaseUid,
    id
) => {
    const party = await repository.findById(
        firebaseUid,
        id
    );

    if (!party) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.PARTY_NOT_FOUND
        );
    }

    return party;
};

exports.updateParty = async (
    firebaseUid,
    id,
    data
) => {
    const party = await exports.getPartyById(
        firebaseUid,
        id
    );

    const partyName = data.name.trim().toUpperCase();

    if (party.name !== partyName) {
        const existingParty = await repository.findByName(
            firebaseUid,
            partyName
        );

        if (existingParty) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                MESSAGES.PARTY_ALREADY_EXISTS
            );
        }
    }

    return repository.update(
        firebaseUid,
        id,
        {
            name: partyName,
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
        }
    );
};

exports.deleteParty = async (
    firebaseUid,
    id
) => {
    await exports.getPartyById(
        firebaseUid,
        id
    );

    // Pending order validation
    // will be implemented in Order Module

    return repository.softDelete(
        firebaseUid,
        id
    );
};