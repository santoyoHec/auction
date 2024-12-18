const catchError = require('../../utils/catchError');
const Document = require('../../models/User/Document');
// const sequelize = require("../../utils/connection");
// const {
//     uploadToCloudinary,
//     deleteFromCloudinary,
//   } = require("../../utils/cloudinary");

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Document.findAndCountAll({
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
    return res.json(response)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Document.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const getOneByCompany = catchError(async(req, res) => {
    const { id } = req.body;
    // console.log("id", id)
    const result = await Document.findOne({where: {companyId: id}});
    if(!result) return res.status(400).json({ message: "Error al consultar los documentos de la compañia", result });
    return res.json({document: result});
});

module.exports = {
    getAll,
    getOne,
    getOneByCompany,
}