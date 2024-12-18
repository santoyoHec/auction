const catchError = require("../../utils/catchError");
const AuctionGuest = require("../../models/Auction/AuctionGuest");
const Auction = require("../../models/Auction/Auction");
const User = require("../../models/User/User");
const VariantProduct = require("../../models/Product/VariantProduct");
const { Op, literal, col } = require('sequelize');
const Address = require("../../models/Address/Address");
const Company = require("../../models/User/Company");
const Product = require("../../models/Product/Product");
const Price = require("../../models/Product/Price");
const Stock = require("../../models/Product/Stock");

const getAll = catchError(async (req, res) => {
  //Recibe el id de la subasta
  let auctionId = req.body.auctionId;
  const results = await AuctionGuest.findAll({ where: auctionId });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  //En el body debe de llevar la id de la subasta
  const result = await AuctionGuest.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  //Recibe el id de la subasta
  let auctionId = req.body.auctionId;
  const { id } = req.params;
  const result = await AuctionGuest.findOne({ where: id, auctionId });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await AuctionGuest.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await AuctionGuest.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});
const addGuest = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await AuctionGuest.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const getAllParticipating = catchError(async (req, res) => {
  const { companyId, status, type } = req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  // const send = new Date();
  // const year = send.getFullYear();
  // const mes = String(send.getMonth() + 1).padStart(2, '0');
  // const dia = String(send.getDate()).padStart(2, '0');
  // const startOfDay = `${year}-${mes}-${dia} 00:00:00`;
  // const endOfDay = `${year}-${mes}-${dia} 23:59:59`;
  var results = [];
  if (!status) {
    if (!type) {
      ///Sin status y sin type
      console.log("Sin status y sin type")
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              // startDate: { [Op.lte]: startOfDay } ,
              // endDate: { [Op.gte]: endOfDay },
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId
            }
           },
        ]
      });
    } else {
      ///Sin status y con type
      console.log("Sin status y con type")
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              // startDate: { [Op.lte]: startOfDay } ,
              // endDate: { [Op.gte]: endOfDay },
              type
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId,
            }
           },
        ]
      });
    }
  } else {
    if (!type){
      ///Con status y sin type
      console.log("con status y sin type")
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              // startDate: { [Op.lte]: startOfDay } ,
              // endDate: { [Op.gte]: endOfDay },
              status,
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId,
              
            }
           },
        ]
      });
    } else {
      ///Con status y con type
      console.log("Con status y con type")
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              // startDate: { [Op.lte]: startOfDay } ,
              // endDate: { [Op.gte]: endOfDay },
              type,
              status,
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId,
            }
           },
        ]
      });
    }
  }
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  return res.json(response);
});

const getAllParticipatingSearch = catchError(async (req, res) => {
  const { companyId, query, status, type } = req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const send = new Date();
  const year = send.getFullYear();
  const mes = String(send.getMonth() + 1).padStart(2, '0');
  const dia = String(send.getDate()).padStart(2, '0');
  const startOfDay = `${year}-${mes}-${dia} 00:00:00`;
  const endOfDay = `${year}-${mes}-${dia} 23:59:59`;
  var results = [];
  if ( !status ){
    if ( !type ){
      ///Sin status y sin type
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              startDate: { [Op.lte]: startOfDay } ,
              endDate: { [Op.gte]: endOfDay },
              name: { [Op.iLike]: `%${query}%`},
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId
            }
           },
        ]
      });
    } else {
      ///Sin status y con type
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              startDate: { [Op.lte]: startOfDay } ,
              endDate: { [Op.gte]: endOfDay },
              name: { [Op.iLike]: `%${query}%`},
              type
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId
            }
           },
        ]
      });
    }
  } else {
    if ( !type ){
      ///Con status y sin type
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              startDate: { [Op.lte]: startOfDay } ,
              endDate: { [Op.gte]: endOfDay },
              name: { [Op.iLike]: `%${query}%`},
              status
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId
            }
           },
        ]
      });
    } else {
      ///Con status y con type
      results = await AuctionGuest.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: Auction,
            include: [
              { model: Address },
              { model: Company },
              { model: VariantProduct,
                include: [
                  { model: Product },
                  { model: Price },
                  { model: Stock },
                ]
              },
            ],
            where: {
              startDate: { [Op.lte]: startOfDay } ,
              endDate: { [Op.gte]: endOfDay },
              name: { [Op.iLike]: `%${query}%`},
              status, 
              type,
             }
           },
          { model: User,
            where: {
              isAdmin: true,
              companyId
            }
           },
        ]
      });
    }
  }
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  return res.json(response);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  addGuest,
  getAllParticipating,
  getAllParticipatingSearch,
};
