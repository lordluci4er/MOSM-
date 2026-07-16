const orderRepository = require("../repositories/order.repository");

const medicineRepository = require("../../medicines/repositories/medicine.repository");
const partyRepository = require("../../parties/repositories/party.repository");

const {
    ApiError,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

// Transform Order Response
const mapOrder = (order) => {
    if (!order) return null;

    return {
        _id: order._id,

        medicine: order.medicineId,

        party: order.partyId,

        quantity: order.quantity,

        status: order.status,

        notes: order.notes,

        receivedAt: order.receivedAt,

        receivedBy: order.receivedBy,

        createdAt: order.createdAt,

        updatedAt: order.updatedAt,
    };
};

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

    const order = await orderRepository.create({
        firebaseUid,
        medicineId: data.medicineId,
        partyId: data.partyId,
        quantity: data.quantity || 1,
        notes: data.notes || "",
    });

    const populatedOrder =
        await orderRepository.findById(
            firebaseUid,
            order._id
        );

    return mapOrder(populatedOrder);
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
        items: items.map(mapOrder),

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

    return mapOrder(order);
};

exports.receiveOrder = async (
    firebaseUid,
    id
) => {
    await exports.getOrderById(
        firebaseUid,
        id
    );

    const order =
        await orderRepository.update(
            firebaseUid,
            id,
            {
                status: "RECEIVED",
                receivedAt: new Date(),
                receivedBy: firebaseUid,
            }
        );

    return mapOrder(order);
};

exports.returnOrder = async (
    firebaseUid,
    id
) => {
    await exports.getOrderById(
        firebaseUid,
        id
    );

    const order =
        await orderRepository.softDelete(
            firebaseUid,
            id
        );

    return mapOrder(order);
};