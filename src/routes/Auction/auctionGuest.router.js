const {
  getAll, create, getOne, remove, update, addGuest, getAllParticipating, getAllParticipatingSearch
} = require("../../controllers/Auction/auctionGuest.controller");
const express = require("express");

const auctionGuestRouter = express.Router();

auctionGuestRouter.route("/auctionguest").get(getAll).post(create);
auctionGuestRouter.route("/auctionguest/add").post(addGuest);

auctionGuestRouter
  .route("/auctionguest/:id")
  .get(getOne)
  .delete(remove)
  .put(update);

auctionGuestRouter.route('/auctionguest/participating').post(getAllParticipating)
auctionGuestRouter.route('/auctionguest/participating/search').post(getAllParticipatingSearch)

module.exports = auctionGuestRouter;
