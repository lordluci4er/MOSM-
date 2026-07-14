const service = require("../services/order.service");

const {
    asyncHandler,
    success,
    HTTP_STATUS,
    MESSAGES,
} = require("../../../shared");

exports.createOrder = asyncHandler(async (req, res) => {
    const order = await service.createOrder(
        req.user.uid,
        req.body
    );

    return success(
        res,
        MESSAGES.ORDER_CREATED,
        order,
        HTTP_STATUS.CREATED
    );
});

exports.getOrders = asyncHandler(async (req, res) => {
    const orders = await service.getOrders(
        req.user.uid,
        req.query
    );

    return success(
        res,
        MESSAGES.ORDERS_FETCHED,
        orders,
        HTTP_STATUS.OK
    );
});

exports.getOrder = asyncHandler(async (req, res) => {
    const order = await service.getOrderById(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        MESSAGES.ORDER_FETCHED,
        order,
        HTTP_STATUS.OK
    );
});

exports.receiveOrder = asyncHandler(async (req, res) => {
    const order = await service.receiveOrder(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        MESSAGES.ORDER_RECEIVED,
        order,
        HTTP_STATUS.OK
    );
});

exports.returnOrder = asyncHandler(async (req, res) => {
    const order = await service.returnOrder(
        req.user.uid,
        req.params.id
    );

    return success(
        res,
        "Order returned successfully",
        order,
        HTTP_STATUS.OK
    );
});