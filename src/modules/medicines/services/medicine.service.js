const repository = require("../repositories/medicine.repository");

const {
    ApiError,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.createMedicine = async (firebaseUid, data) => {
    const medicineName = data.name.trim().toUpperCase();

    const existingMedicine = await repository.findByName(
        firebaseUid,
        medicineName
    );

    if (existingMedicine) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.MEDICINE_ALREADY_EXISTS
        );
    }

    return repository.create({
        firebaseUid,
        name: medicineName,
    });
};

exports.getMedicines = async (
    firebaseUid,
    query = {}
) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;

    const filters = {
        page,
        limit,
        search: query.search || "",
        status: query.status || null,
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

exports.getMedicineById = async (
    firebaseUid,
    id
) => {
    const medicine = await repository.findById(
        firebaseUid,
        id
    );

    if (!medicine) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.MEDICINE_NOT_FOUND
        );
    }

    return medicine;
};

exports.updateMedicine = async (
    firebaseUid,
    id,
    data
) => {
    const medicine = await exports.getMedicineById(
        firebaseUid,
        id
    );

    const medicineName = data.name.trim().toUpperCase();

    if (medicine.name !== medicineName) {
        const existingMedicine =
            await repository.findByName(
                firebaseUid,
                medicineName
            );

        if (existingMedicine) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                MESSAGES.MEDICINE_ALREADY_EXISTS
            );
        }
    }

    return repository.update(
        firebaseUid,
        id,
        {
            name: medicineName,
        }
    );
};

exports.deleteMedicine = async (
    firebaseUid,
    id
) => {
    await exports.getMedicineById(
        firebaseUid,
        id
    );

    // Pending order validation will be added
    // in Order Module (Step 7)

    return repository.softDelete(
        firebaseUid,
        id
    );
};