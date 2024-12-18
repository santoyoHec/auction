const catchError = require("../../utils/catchError");
const Auction = require("../../models/Auction/Auction");
const AuctionGuest = require("../../models/Auction/AuctionGuest");
const GuestBid = require("../../models/Auction/GuestBid");
const Address = require("../../models/Address/Address");
const Company = require("../../models/User/Company");
const VariantProduct = require("../../models/Product/VariantProduct");
const Price = require("../../models/Product/Price");
const Stock = require("../../models/Product/Stock");
const Product = require("../../models/Product/Product");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cloudinary");
const sequelize = require("../../utils/connection");
const User = require("../../models/User/User");
const { Op, literal, col } = require("sequelize");
const Category = require("../../models/Product/Category");

const getAll = catchError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Auction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [{ model: AuctionGuest }],
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
const getAllByStatusAndType = catchError(async (req, res) => {
  const { status, type } = req.body;
  console.log(status ?? "no hay estatus", type ?? "no hay tipo");
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  if (!status && !type) {
    const results = await Auction.findAndCountAll({
      limit: pageSize,
      offset: offset,
      where: {
        openAuction: true,
        // status,
        // type,
      },
      include: [
        { model: AuctionGuest },
        { model: Address },
        { model: Company },
        {
          model: VariantProduct,
          include: [{ model: Product }, { model: Price }, { model: Stock }],
        },
      ],
      order: [["endDate", "DESC"]],
    });
    const response = {
      totalRecords: results.count,
      totalPages: Math.ceil(results.count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: results.rows,
    };
    return res.json(response);
  }

  if (!status && type) {
    const results = await Auction.findAndCountAll({
      limit: pageSize,
      offset: offset,
      where: {
        openAuction: true,
        // status,
        type,
      },
      include: [
        { model: AuctionGuest },
        { model: Address },
        { model: Company },
        {
          model: VariantProduct,
          include: [{ model: Product }, { model: Price }, { model: Stock }],
        },
      ],
      order: [["endDate", "DESC"]],
    });
    const response = {
      totalRecords: results.count,
      totalPages: Math.ceil(results.count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: results.rows,
    };
    return res.json(response);
  }
  if (status && !type) {
    const results = await Auction.findAndCountAll({
      limit: pageSize,
      offset: offset,
      where: {
        openAuction: true,
        status,
        // type,
      },
      include: [
        { model: AuctionGuest },
        { model: Address },
        { model: Company },
        {
          model: VariantProduct,
          include: [{ model: Product }, { model: Price }, { model: Stock }],
        },
      ],
      order: [["endDate", "DESC"]],
    });
    const response = {
      totalRecords: results.count,
      totalPages: Math.ceil(results.count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: results.rows,
    };
    return res.json(response);
  }

  const results = await Auction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    where: {
      openAuction: true,
      status,
      type,
    },
    include: [
      { model: AuctionGuest },
      { model: Address },
      { model: Company },
      {
        model: VariantProduct,
        include: [{ model: Product }, { model: Price }, { model: Stock }],
      },
    ],
    order: [["endDate", "DESC"]],
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

const getAllCreated = catchError(async (req, res) => {
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
      console.log("Sin status y sin type");
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay } ,
          // endDate: { [Op.gte]: endOfDay },
        },
        order: [["endDate", "DESC"]],
      });
    } else {
      ///Sin status y con type
      console.log("Sin status y con type");
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay } ,
          // endDate: { [Op.gte]: endOfDay },
          type,
        },
        order: [["endDate", "DESC"]],
      });
    }
  } else {
    if (!type) {
      ///Con status y Sin type
      console.log("Con status y sin type");
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay } ,
          // endDate: { [Op.gte]: endOfDay },
          status,
        },
        order: [["endDate", "DESC"]],
      });
    } else {
      ///Con status y con type
      console.log("Con status y Con type");
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay } ,
          // endDate: { [Op.gte]: endOfDay },
          status,
          type,
        },
        order: [["endDate", "DESC"]],
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

const getAllCreatedSearch = catchError(async (req, res) => {
  const { companyId, query, status, type } = req.body;
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
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay },
          // endDate: { [Op.gte]: endOfDay },
          name: { [Op.iLike]: `%${query}%` },
        },
        order: [["endDate", "DESC"]],
      });
    } else {
      ///Sin status y con type
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay },
          // endDate: { [Op.gte]: endOfDay },
          name: { [Op.iLike]: `%${query}%` },
          type,
        },
        order: [["endDate", "DESC"]],
      });
    }
  } else {
    if (!type) {
      ///Con status y sin type
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay },
          // endDate: { [Op.gte]: endOfDay },
          name: { [Op.iLike]: `%${query}%` },
          status,
        },
        order: [["endDate", "DESC"]],
      });
    } else {
      ///Con status y con type
      results = await Auction.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
          { model: AuctionGuest },
          { model: Company },
          { model: Address },
          {
            model: VariantProduct,
            include: [
              { model: Product, include: [{ model: Category }] },
              { model: Price },
              { model: Stock },
            ],
          },
        ],
        where: {
          companyId,
          // startDate: { [Op.lte]: startOfDay },
          // endDate: { [Op.gte]: endOfDay },
          name: { [Op.iLike]: `%${query}%` },
          status,
          type,
        },
        order: [["endDate", "DESC"]],
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

const getAllWinner = catchError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Auction.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [
      { model: AuctionGuest },
      { model: GuestBid, where: { winnerBid: true } },
    ],
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
  //   return res.status(404).json({ error: "este es un error desde el backend" });
  return res.status(201).json({ ok: "auction Controller" });
  const result = await Auction.create({ ...body });
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Auction.findByPk(id, {
    include: [
      { model: Address },
      { model: VariantProduct },
      { model: AuctionGuest, include: [{ model: User }, { model: GuestBid }] },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Auction.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Auction.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const getAuctionAddress = catchError(async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const result = await Auction.findAll({
    where: { id },
    include: [
      { model: Address },
      { model: Company },
      {
        model: VariantProduct,
        include: [{ model: Price }, { model: Stock }, { model: Product }],
      },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const createAuctionVariantFile = catchError(async (req, res) => {
  const {
    auction,
    address,
    variantProduct,
    price,
    stock,
    productId,
    companyId,
  } = req.body;
  const transaction = await sequelize.transaction();
  console.log(
    "datos:",
    JSON.parse(auction),
    JSON.parse(address),
    JSON.parse(variantProduct),
    JSON.parse(price),
    JSON.parse(stock),
    JSON.parse(productId),
    JSON.parse(companyId)
  );
  try {
    const files = req.files;
    // console.log('files', files)
    const urls = [];
    for (const file of files) {
      const { secure_url } = await uploadToCloudinary(file); //secure_url
      urls.push(secure_url);
    }
    console.log("urls", urls);

    const addressss = await Address.create(
      { ...JSON.parse(address), mainAddress: true },
      { transaction }
    );

    const variantProductt = await VariantProduct.create(
      {
        ...JSON.parse(variantProduct),
        imageURL: urls[0],
        isActive: true,
        productId: JSON.parse(productId),
        companyId: JSON.parse(companyId),
      },
      { transaction }
    );

    const stockss = await Stock.create(
      {
        ...JSON.parse(stock),
        variantProductId: variantProductt.id,
        companyId: "",
      },
      { transaction }
    );

    const pricesss = await Price.create(
      {
        ...JSON.parse(price),
        variantProductId: variantProductt.id,
      },
      { transaction }
    );

    const auctionsss = await Auction.create(
      {
        ...JSON.parse(auction),
        variantProductId: variantProductt.id,
        addressId: addressss.id,
        companyId: JSON.parse(companyId),
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).json({
      address: addressss,
      variantProduct: variantProductt,
      stopck: stockss,
      price: pricesss,
      auction: auctionsss,
    });
  } catch (error) {
    await transaction.rollback();
    return res
      .status(404)
      .json({ message: "Error al guardar los datos de la apuesta", error });
  }
});

const getAllSearch = catchError(async (req, res) => {
  const { query, companyId } = req.body;
  const result = await Auction.findAll({
    include: [
      {
        model: VariantProduct,
        include: [
          { model: Stock },
          { model: Price },
          { model: Product, include: [{ model: Category }] },
        ],
      },
    ],
    where: {
      companyId: companyId,
      name: { [Op.iLike]: `%${query}%` },
      openAuction: false,
    },
    subQuery: false,
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const updateAuctionAddress = catchError(async (req, res) => {
  const { auctionId, auction, addressId, address } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const result = await Auction.update(
      { ...auction },
      {
        where: { id: auctionId },
        returning: true,
      },
      { transaction }
    );

    const resultAdd = await Address.update(
      { ...address },
      {
        where: { id: addressId },
        returning: true,
      },
      { transaction }
    );

    await transaction.commit();
    return res.json({ auction: result[1][0], address: resultAdd[1][0] });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error("Error durante la transacción:", error);
    return res
      .status(404)
      .json({ message: "Error al actualizar los datos de la apuesta", error });
  }
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  getAllWinner,
  getAuctionAddress,
  createAuctionVariantFile,
  getAllSearch,
  getAllCreated,
  getAllCreatedSearch,
  updateAuctionAddress,
  getAllByStatusAndType,
};
