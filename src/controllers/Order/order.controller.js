const catchError = require('../../utils/catchError');
const Order = require('../../models/Order/Order');
const OrderDetail = require('../../models/Order/OrderDetail');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Order.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [{ model: OrderDetail }],
    });
    const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
    };
    return res.json(response)
});

const create = catchError(async(req, res) => {
    let body = req.body;
    const result = await Order.create({...body, OrderDetail: undefined});
    let orderId = JSON.stringify(result.id);
    let p = orderId.replace("\"", "").replace("\"", "");
    for (let i = 0; i < body.OrderDetail.length; i++) {
        const addOrderDetails = {
            product: body.OrderDetail[i].product,
            quantity: body.OrderDetail[i].quantity,
            price: body.OrderDetail[i].price,
            value: body.OrderDetail[i].value,
            unitOfMeasurement: body.OrderDetail[i].unitOfMeasurement,
            currencyCode: body.OrderDetail[i].currencyCode,
            orderId: p,
        };
        await OrderDetail.create(addOrderDetails);
    }
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Order.findByPk({
        where: id,
        include: [{ model: OrderDetail }],
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Order.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Order.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}