const { getAll, create, getOne, remove, update 
} = require('../../controllers/Order/order.controller');
const express = require('express');

const orderRouter = express.Router();

orderRouter.route('/order')
    .get(getAll)
    .post(create);

orderRouter.route('/order/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = orderRouter;