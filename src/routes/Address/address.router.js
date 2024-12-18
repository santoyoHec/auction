const {
  getAll,
  create,
  getOne,
  remove,
  update,
  getAllByUserID,
  createUserId,
  updateMainAddressCompany,
  updateMainAddressUser,
  getAllByCompanyID,
  createCompanyId,
  createAddressAuction,
  createAddressAuction2,
} = require("../../controllers/Address/address.controller");
const express = require("express");

const addressRouter = express.Router();

addressRouter.route("/address").get(getAll).post(create);

addressRouter.route("/addressauction").post(createAddressAuction);

addressRouter.route("/address/:id").get(getOne).delete(remove).put(update);

addressRouter.route("/address/userid").post(getAllByUserID);
addressRouter.route("/address/create/userid").post(createUserId);
addressRouter.route("/address/update/userid/:id").put(updateMainAddressUser);
addressRouter
  .route("/address/update/companyId/:id")
  .put(updateMainAddressCompany);
addressRouter.route("/address/companyId").post(getAllByCompanyID);
addressRouter.route("/address/create/companyid").post(createCompanyId);
addressRouter.route("/addressauction1").post(createAddressAuction2);

module.exports = addressRouter;
