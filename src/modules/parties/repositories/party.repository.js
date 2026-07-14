const Party = require("../models/party.model");

exports.create = (data) => {
    return Party.create(data);
};

exports.findAll = (
    firebaseUid,
    {
        page = 1,
        limit = 50,
        search = "",
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

    return Party.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
};

exports.count = (
    firebaseUid,
    {
        search = "",
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

    return Party.countDocuments(query);
};

exports.findById = (firebaseUid, id) => {
    return Party.findOne({
        _id: id,
        firebaseUid,
        isDeleted: false,
    });
};

exports.findByName = (firebaseUid, name) => {
    return Party.findOne({
        firebaseUid,
        name,
        isDeleted: false,
    });
};

exports.update = (firebaseUid, id, data) => {
    return Party.findOneAndUpdate(
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
    return Party.findOneAndUpdate(
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