const orderRepository = require("../repositories/order.repository");

const medicineRepository = require("../../medicines/repositories/medicine.repository");
const partyRepository = require("../../parties/repositories/party.repository");

const {
    ApiError,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.createOrder = async (firebaseUid, data) => {
    // Check Medicine
    const medicine = await medicineRepository.findById(
        firebaseUid,
        data.medicineId
    );

    if (!medicine) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.MEDICINE_NOT_FOUND
        );
    }

    // Check Party
    const party = await partyRepository.findById(
        firebaseUid,
        data.partyId
    );

    if (!party) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.PARTY_NOT_FOUND
        );
    }

    // One Pending Order Rule
    const pendingOrder =
        await orderRepository.findPendingByMedicine(
            firebaseUid,
            data.medicineId
        );

    if (pendingOrder) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            "Medicine already has a pending order"
        );
    }

    return orderRepository.create({
        firebaseUid,
        medicineId: data.medicineId,
        partyId: data.partyId,
        quantity: data.quantity || 1,
        notes: data.notes || "",
    });
};

exports.getOrders = async (
    firebaseUid,
    query = {}
) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 50;

    const filters = {
        page,
        limit,
        partyId: query.partyId || null,
        status: query.status || null,
    };

    const [items, total] = await Promise.all([
        orderRepository.findAll(firebaseUid, filters),
        orderRepository.count(firebaseUid, filters),
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

exports.getOrderById = async (
    firebaseUid,
    id
) => {
    const order =
        await orderRepository.findById(
            firebaseUid,
            id
        );

    if (!order) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.ORDER_NOT_FOUND
        );
    }

    return order;
};

exports.receiveOrder = async (
    firebaseUid,
    id
) => {
    await exports.getOrderById(
        firebaseUid,
        id
    );

    return orderRepository.update(
        firebaseUid,
        id,
        {
            status: "RECEIVED",
            receivedAt: new Date(),
            receivedBy: firebaseUid,
        }
    );
};

exports.returnOrder = async (
    firebaseUid,
    id
) => {
    await exports.getOrderById(
        firebaseUid,
        id
    );

    return orderRepository.softDelete(
        firebaseUid,
        id
    );
};