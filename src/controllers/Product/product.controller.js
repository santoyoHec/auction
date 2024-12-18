const catchError = require('../../utils/catchError');
const Product = require('../../models/Product/Product');
const Price = require('../../models/Product/Price');
const Stock = require('../../models/Product/Stock');
const VariantProduct = require('../../models/Product/VariantProduct');
const MetaField = require('../../models/Product/MetaField');
const Category = require('../../models/Product/Category');
const {
    uploadToCloudinary,
    deleteFromCloudinary,
  } = require("../../utils/cloudinary");
  const { Op, literal, col } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Product.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: MetaField }, 
            { model: Price },
            { model: Stock },
            { model: VariantProduct },
        ],
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

const getAllProducts = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Product.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: Category }, 
        ],
    });
    const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
    };
    if(!results) {
        return res.status(404).json({message: "Error al consultar los producto", result });
    }
    return res.json(response)
});

const getAllProductsCompany = catchError(async(req, res) => {
    const {companyId} = req.body;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Product.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [{ 
            model: VariantProduct,
            as: 'variants',
            required: false,
            // where: {
            //     [Op.or]: [
            //         { companyId: companyId }
            //     ]
            // }
            // where: {
            //     companyId: companyId
            // }
        }],
        where: {
            [Op.or]: [
                { companyId: companyId },
                { '$variants.companyId$': companyId } 
                // { '$VariantProduct.companyId$': companyId },
                // literal(`"variantProduct"."companyId" = '${companyId}'`),
                // { [col('variants.companyId')]: companyId },
            ]
        },
        subQuery: false,
    });
    const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
    };
    if(!results) {
        return res.status(404).json({message: "Error al consultar los producto", result });
    }
    return res.json(response)
});

const create = catchError(async(req, res) => {
    const { product, companyId } = req.body;
  console.log("product", product)
  try{
    const files = req.files;
    // console.log('files', files)
    const urls = [];
    for (const file of files) {
        const { secure_url } = await uploadToCloudinary(file);//secure_url
        urls.push(secure_url);
    }
    // console.log('urls', urls)
    const Products = await Product.create({ ...JSON.parse(product), imageURL: urls[0], companyId: JSON.parse(companyId) });
    return res.status(200).json({Products});
  } catch (error) {
    return res.status(404).json({message: "Error al crear el producto", error });
  }
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id);
    if(!result) {
        return res.status(404).json({message: "Error al consultar el producto", result });
    }
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { product } = req.body;
    try {
        const prod = await Product.update(
        { ...product },
        { where: { id }, returning: true }
        );
        return res.json(prod);
    } catch (error) {
        return res.status(404).json({message: "Error al actualizar la categoría", error });
    }
});

const updateFile = catchError(async(req, res) => {
    const { id } = req.params;
    const { product } = req.body;
    try{
      const files = req.files;
      // console.log('files', files)
      const urls = [];
      for (const file of files) {
          const { secure_url } = await uploadToCloudinary(file);//secure_url
          urls.push(secure_url);
      }
      console.log('urls', urls)
      const categrory = await Product.update(
        { ...JSON.parse(product), imageURL: urls[0] },
        { where: { id }, returning: true }
        );
      return res.status(200).json({categrory});
    } catch (error) {
      return res.status(404).json({message: "Error al actualizar el producto", error });
    }
  });

  const getAllProductsByCategory = catchError(async(req, res) => {
    const { categoryId } = req.body;
    const results = await Product.findAll({
        where: {
            categoryId
        }
    });
    if(!results) {
        return res.status(404).json({message: "Error al consultar los producto", results });
    }
    return res.json(results)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getAllProducts,
    getAllProductsCompany,
    updateFile,
    getAllProductsByCategory,
}