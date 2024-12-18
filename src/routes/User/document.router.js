const { 
    getAll, getOne, getOneByCompany,
} = require('../../controllers/User/document.controller');
const express = require('express');

const DocumentRouter = express.Router();

DocumentRouter.route('/document').get(getAll)

DocumentRouter.route('/document/:id')
    .get(getOne)
    // .delete(remove)
    // .put(update);

DocumentRouter.route('/document/byCompany').post(getOneByCompany);

module.exports = DocumentRouter;