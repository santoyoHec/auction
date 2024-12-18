const { getAll, create, getOne, remove, update 
} = require('../../controllers/Order/sumaryTransaction.controller');
const express = require('express');

const SummaryRouter = express.Router();

SummaryRouter.route('/summary')
    .get(getAll)
    .post(create);

SummaryRouter.route('/summary/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = SummaryRouter;