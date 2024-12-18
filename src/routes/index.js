const express = require("express");
const router = express.Router();

const addressRouter = require("./Address/address.router");
const orderRouter = require("./Order/order.router");
const userRouter = require("./User/user.router");
const auctionRouter = require("./Auction/auction.router");
const auctionGuest = require("./Auction/auctionGuest.router");
const guestBidRouter = require("./Auction/guestBid.router");
const productRouter = require("./Product/product.router");
const companyRouter = require("./User/company.router");
const summaryRouter = require("./Order/summaryTransaction.router");
const documentRouter = require("./User/document.router");
const userActionRouter = require("./UserAction/UserAction.router");
const locationIQRouter = require("./locationIQ.routes")
const categoryRouter = require("./Product/category.router")
const variantProductRouter = require("./Product/variantProduct.router")
const auctionInvitationRouter = require("./Auction/auctionInvitaion.router")

// colocar las rutas aquí

//Adress
router.use(addressRouter);
router.use(userActionRouter);

//Order
router.use(orderRouter);
router.use(summaryRouter);

//User
router.use(userRouter);
router.use(companyRouter);
router.use(documentRouter);

//Auction
router.use(auctionRouter);
router.use(auctionGuest);
router.use(guestBidRouter);
router.use(auctionInvitationRouter);

//Product
router.use(productRouter);
router.use(categoryRouter)
router.use(variantProductRouter)

//Get Token
router.use(locationIQRouter)

module.exports = router;
