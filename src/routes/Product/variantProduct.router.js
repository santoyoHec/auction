const { getAll, create, getOne, remove, update, updateFile, getAllProduct, getAllSearch, 
} = require('../../controllers/Product/variantProduct.controller');
const express = require('express');
const upload = require("../../utils/multer");

const variantProductRouter = express.Router();

variantProductRouter.route('/variantProduct')
    .get(getAll)
    .post(upload.array("files", 1),create);

variantProductRouter.route('/variantProduct/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

variantProductRouter.route('/variantProduct/updateFile/:id').put(upload.array("files", 1),updateFile)
variantProductRouter.route('/variantProduct/product').post(getAllProduct)
variantProductRouter.route('/variantProduct/search').post(getAllSearch)

module.exports = variantProductRouter;