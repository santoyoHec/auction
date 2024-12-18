const catchError = require("../../utils/catchError");
const Address = require("../../models/Address/Address");
const Auction = require("../../models/Auction/Auction");
const AddressType = require("../../models/Address/AddressType");
const sequelize = require("../../utils/connection");
const Producto = require("../../models/Product/Product");

const getAll = catchError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Address.findAndCountAll({
    limit: pageSize,
    offset: offset,
    include: [{ model: AddressType }],
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
  console.log("req.body :>> ", req.body);
  // return res.status(201).json({ ok: "address Controller" });
  // return res.status(404).json({ error: "este es un error desde el backend" });
  const body = req.body;
  const result = await Address.create({ ...body });
  // let idAddress = JSON.stringify(result.id);
  // let p = idAddress.replace('"', "").replace('"', "");
  // // console.log('idAddress: ', p)
  // for (let i = 0; i < body.AddressType.length; i++) {
  //   const addType = {
  //     addressType: body.AddressType[i].addressType,
  //     addressId: p,
  //   };
  //   await AddressType.create(addType);
  // }
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Address.findOne({ where: { id } });
  if (!result) {
    return res
      .status(401)
      .json({ message: "Error al consultar los domicilios", error: result });
  }
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Address.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { address } = req.body;
  const { id } = req.params;
  const result = await Address.update(
    { ...address },
    { where: { id }, returning: true }
  );
  if (result[0] === 0) {
    return res
      .status(401)
      .json({ message: "Error al actualizar el domicilio", error: result });
  }
  return res.json({ Address: result[1][0] });
});

const getAllByUserID = catchError(async (req, res) => {
  const { userId } = req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Address.findAndCountAll({
    where: { userId },
    limit: pageSize,
    offset: offset,
  });
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  if (!results) {
    return res
      .status(401)
      .json({ message: "Error al consultar los domicilios", error: results });
  }
  return res.json(response);
});

const createUserId = catchError(async (req, res) => {
  const { userId, address } = req.body;
  // console.log("userId", userId)
  // console.log("address", address)
  const result = await Address.create({ ...address, userId });
  if (!result) {
    return res
      .status(401)
      .json({ message: "Error al crear el domicilio", error: result });
  }
  return res.json(result);
});

const updateMainAddressUser = catchError(async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  const result = await Address.update(
    { mainAddress: false },
    { where: { userId }, returning: true }
  );
  if (result[0] === 0) {
    return res.status(401).json({
      message: "Error al actualizar el domicilio principal",
      error: result,
    });
  }
  const result1 = await Address.update(
    { mainAddress: true },
    { where: { id }, returning: true }
  );
  if (result1[0] === 0) {
    return res.status(401).json({
      message: "Error al actualizar el domicilio principal",
      error: result1,
    });
  }
  return res.json({ Address: result[1][0], Address1: result1[1][0] });
});

const updateMainAddressCompany = catchError(async (req, res) => {
  const { companyId } = req.body;
  const { id } = req.params;
  const result = await Address.update(
    { mainAddress: false },
    { where: { companyId }, returning: true }
  );
  if (result[0] === 0) {
    return res.status(401).json({
      message: "Error al actualizar el domicilio principal",
      error: result,
    });
  }
  const result1 = await Address.update(
    { mainAddress: true },
    { where: { id }, returning: true }
  );
  if (result1[0] === 0) {
    return res.status(401).json({
      message: "Error al actualizar el domicilio principal",
      error: result1,
    });
  }
  return res.json({ Address: result[1][0], Address1: result1[1][0] });
});

const getAllByCompanyID = catchError(async (req, res) => {
  const { companyId } = req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const results = await Address.findAndCountAll({
    where: { companyId },
    limit: pageSize,
    offset: offset,
  });
  const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
  };
  if (!results) {
    return res
      .status(401)
      .json({ message: "Error al consultar los domicilios", error: results });
  }
  return res.json(response);
});

const createCompanyId = catchError(async (req, res) => {
  const { companyId, address } = req.body;
  // console.log("userId", userId)
  // console.log("address", address)
  const result = await Address.create({ ...address, companyId });
  if (!result) {
    return res
      .status(401)
      .json({ message: "Error al crear el domicilio", error: result });
  }
  return res.json(result);
});

const createAddressAuction = catchError(async (req, res) => {
  //   name
  // description
  // isActive
  // imageURL
  const { address, auction } = req.body;

  const t = await sequelize.transaction();

  try {
    const addressModel = await Address.create(address, { transaction: t });
    const auctionModel = await Auction.create(
      {
        ...auction,
        addressId: addressModel.id,
        variantProductId: "14606490-471c-477f-b7c3-d80caf311e24",
      },
      { transaction: t }
    );

    // const r = await Promise.all([addressModel, auctionModel]);
    await t.commit();
    return res.json({ addressModel, auctionModel });
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
    console.log("error :>> ", error);
    return res.status(400).json(error);
  }
});

const createAddressAuction2 = catchError(async (req, res) => {
  const { address, auction, variantProductId, companyId } = req.body;
  const t = await sequelize.transaction();

  try {
    const addressModel = await Address.create({...address, mainAddress: true}, { transaction: t });
    const auctionModel = await Auction.create({
        ...auction,
        addressId: addressModel.id,
        variantProductId,
        companyId,
      }, { transaction: t }
    );
    await t.commit();
    return res.json({ addressModel, auctionModel });
  } catch (error) {
    await t.rollback();
    console.log("error :>> ", error);
    return res.status(400).json(error);
  }
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  getAllByUserID,
  createUserId,
  updateMainAddressUser,
  updateMainAddressCompany,
  getAllByCompanyID,
  createCompanyId,
  createAddressAuction,
  createAddressAuction2
};
