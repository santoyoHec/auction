const { 
    getAll, create, getOne, remove, update, create2, getAllRegister, getOneWithAddress, updateStatus, updateCompanyData, 
    updateCompanyDataFile, getAllSearch,
} = require('../../controllers/User/company.controller');
const express = require('express');
const upload = require("../../utils/multer");

const CompanyRouter = express.Router();

CompanyRouter.route('/company')
    .get(getAll)
    .post(upload.array("files", 8),create);

CompanyRouter.route('/company/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

CompanyRouter.route('/companyGetAll').get(getAllRegister);
CompanyRouter.route('/companyAddress/:id').get(getOneWithAddress)
CompanyRouter.route('/companyUpdateStatus').post(updateStatus)
CompanyRouter.route("/company/update/:id").put(updateCompanyData);
CompanyRouter.route("/company/updateFile").post(upload.array("files", 1),updateCompanyDataFile);
CompanyRouter.route('/company/search').post(getAllSearch)

CompanyRouter.route('/imagens').post(upload.array("files", 9),create2);

module.exports = CompanyRouter;