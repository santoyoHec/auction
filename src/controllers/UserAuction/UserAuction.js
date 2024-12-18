const catchError = require("../../utils/catchError");
const UserAuction = require("../../models/UserAuction/UserAuction");
const User = require("../../models/User/User");
const Auction = require("../../models/Auction/Auction");

const getAll = catchError(async (req, res) => {
  const { page = 1, pageSize = 20 } = req.query;
  const offset = (page - 1) * pageSize;
  const results = await UserAuction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [{ model: User }, { model: Auction }],
  });
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  return res.json(response);
});

const create = catchError(async (req, res) => {
  let body = req.body;
  const result = await UserAuction.create({
    ...body,
    // UserAuctionType: undefined,
  });
  //   let idUserAuction = JSON.stringify(result.id);
  //   let p = idUserAuction.replace('"', "").replace('"', "");
  //   // console.log('idUserAuction: ', p)
  //   for (let i = 0; i < body.UserAuctionType.length; i++) {
  //     const addType = {
  //       UserAuctionType: body.UserAuctionType[i].UserAuctionType,
  //       UserAuctionId: p,
  //     };
  //     await UserAuctionType.create(addType);
  //   }
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await UserAuction.findByPk({
    where: id,
    include: [{ model: UserAuctionType }],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await UserAuction.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  let body = req.body;
  let AddType = req.body.UserAuctionType;
  const { id } = req.params;
  const result = await UserAuction.update({
    ...body,
    UserAuctionType: undefined,
    where: { id },
    returning: true,
  });
  const result1 = await UserAuctionType.update({
    UserAuctionType: AddType,
    where: { UserAuctionId: id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json({
    UserAuction: result[1][0],
    UserAuctionType: result1[1][0],
  });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
