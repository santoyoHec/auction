const { getAll, create, getOne, remove, update, updateFile, 
} = require('../../controllers/Product/category.controller');
const express = require('express');
const upload = require("../../utils/multer");

const CategoryRouter = express.Router();

CategoryRouter.route('/category')
    .get(getAll)
    .post(upload.array("files", 1),create);

CategoryRouter.route('/category/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

CategoryRouter.route('/category/updateFile/:id').put(upload.array("files", 1),updateFile)

module.exports = CategoryRouter;