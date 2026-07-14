const service = require("../services/medicine.service");

const {
    asyncHandler,
    success,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.createMedicine = asyncHandler(async (req, res) => {
    const medicine = await service.createMedicine(
        req.user.uid,
        req.body
    );

    return success(
        res,
        MESSAGES.MEDICINE_CREATED,
        medicine,
        HTTP_STATUS.CREATED
    );
});

exports.getMedicines = asyncHandler(async (req, res) => {
    const medicines = await service.getMedicines(
        req.user.uid,
        req.query
    );

    return success(
        res,
        MESSAGES.MEDICINES_FETCHED,
        medicines,
        HTTP_STATUS.OK
    );
});

exports.getMedicine = asyncHandler(async (req, res) => {
    const medicine = await service.getMedicineById(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        MESSAGES.MEDICINE_FETCHED,
        medicine,
        HTTP_STATUS.OK
    );
});

exports.updateMedicine = asyncHandler(async (req, res) => {
    const medicine = await service.updateMedicine(
        req.user.uid,
        req.params.id,
        req.body
    );

    return success(
        res,
        MESSAGES.MEDICINE_UPDATED,
        medicine,
        HTTP_STATUS.OK
    );
});

exports.deleteMedicine = asyncHandler(async (req, res) => {
    const medicine = await service.deleteMedicine(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        MESSAGES.MEDICINE_DELETED,
        medicine,
        HTTP_STATUS.OK
    );
});