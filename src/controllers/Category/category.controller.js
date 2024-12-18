const { Router, request, response } = require("express");
const Category = require("../models/Category");

const router = Router();

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

const create = catchError(async (req = request, res = response) => {
  const { id, name, description, urlImg } = req.body;
  try {
    const categrory = await Category.create({ id, name, description, urlImg });
    return res.json(categrory);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

const getOne = catchError(async (req = request, res = response) => {
  const { id } = req.body;
  try {
    const categrory = await Category.findByPk(id);
    return res.json(categrory);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

const update = catchError(async (req = request, res = response) => {
  const { id, name, description, urlImg } = req.body;
  try {
    const categrory = await Category.update(
      { name, description, urlImg },
      { where: { id }, returning: true }
    );
    return res.json(categrory);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

const destroy = catchError(async (req = request, res = response) => {
  const { id } = req.body;
  try {
    const categrory = await Category.destroy({ where: { id } });
    return res.json(categrory);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

module.exports = { getAll, create, getOne, update, destroy };
