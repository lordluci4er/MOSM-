const Medicine = require("../models/medicine.model");

exports.create = (data) => {
    return Medicine.create(data);
};

exports.findAll = (
    firebaseUid,
    {
        page = 1,
        limit = 50,
        search = "",
        status = null,
    } = {}
) => {
    const query = {
        firebaseUid,
        isDeleted: false,
    };

    if (search) {
        query.name = {
            $regex: search,
            $options: "i",
        };
    }

    if (status) {
        query.status = status;
    }

    return Medicine.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
};

exports.count = (
    firebaseUid,
    {
        search = "",
        status = null,
    } = {}
) => {
    const query = {
        firebaseUid,
        isDeleted: false,
    };

    if (search) {
        query.name = {
            $regex: search,
            $options: "i",
        };
    }

    if (status) {
        query.status = status;
    }

    return Medicine.countDocuments(query);
};

exports.findById = (firebaseUid, id) => {
    return Medicine.findOne({
        _id: id,
        firebaseUid,
        isDeleted: false,
    });
};

exports.findByName = (firebaseUid, name) => {
    return Medicine.findOne({
        firebaseUid,
        name,
        isDeleted: false,
    });
};

exports.update = (firebaseUid, id, data) => {
    return Medicine.findOneAndUpdate(
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
    );
};

exports.softDelete = (firebaseUid, id) => {
    return Medicine.findOneAndUpdate(
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
    );
};