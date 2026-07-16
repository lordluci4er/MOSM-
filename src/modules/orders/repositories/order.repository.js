const Order = require("../models/order.model");

exports.create = (data) => {
    return Order.create(data);
};

exports.findAll = (
    firebaseUid,
    {
        page = 1,
        limit = 50,
        partyId = null,
        status = null,
    } = {}
) => {
    const query = {
        firebaseUid,
        isDeleted: false,
    };

    if (partyId) {
        query.partyId = partyId;
    }

    if (status) {
        query.status = status;
    }

    return Order.find(query)
        .populate("medicineId", "name")
        .populate("partyId", "name phoneNumber")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
};

exports.count = (
    firebaseUid,
    {
        partyId = null,
        status = null,
    } = {}
) => {
    const query = {
        firebaseUid,
        isDeleted: false,
    };

    if (partyId) {
        query.partyId = partyId;
    }

    if (status) {
        query.status = status;
    }

    return Order.countDocuments(query);
};

exports.findById = (firebaseUid, id) => {
    return Order.findOne({
        _id: id,
        firebaseUid,
        isDeleted: false,
    })
        .populate("medicineId", "name")
        .populate("partyId", "name phoneNumber")
        .lean();
};

exports.findPendingByMedicine = (
    firebaseUid,
    medicineId
) => {
    return Order.findOne({
        firebaseUid,
        medicineId,
        status: "PENDING",
        isDeleted: false,
    });
};

exports.update = (firebaseUid, id, data) => {
    return Order.findOneAndUpdate(
        {
            _id: id,
            firebaseUid,
            isDeleted: false,
        },
        data,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("medicineId", "name")
        .populate("partyId", "name phoneNumber")
        .lean();
};

exports.softDelete = (firebaseUid, id) => {
    return Order.findOneAndUpdate(
        {
            _id: id,
            firebaseUid,
            isDeleted: false,
        },
        {
            isDeleted: true,
        },
        {
            new: true,
        }
    )
        .populate("medicineId", "name")
        .populate("partyId", "name phoneNumber")
        .lean();
};