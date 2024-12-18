const { getAll, create, getOne, remove, update, getWinner
} = require('../../controllers/Auction/guestBid.controller');
const express = require('express');

const guestBidRouter = express.Router();

guestBidRouter.route('/guestBid')
    .get(getAll)
    .post(create);

guestBidRouter.route('/guestBid/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

guestBidRouter.route('/guestBid/getWinner').post(getWinner)

module.exports = guestBidRouter;