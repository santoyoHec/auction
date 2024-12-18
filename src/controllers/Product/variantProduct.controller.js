const catchError = require('../../utils/catchError');
const Price = require('../../models/Product/Price');
const Stock = require('../../models/Product/Stock');
const VariantProduct = require('../../models/Product/VariantProduct');
const sequelize = require("../../utils/connection");
const {
    uploadToCloudinary,
    deleteFromCloudinary,
  } = require("../../utils/cloudinary");
const Product = require('../../models/Product/Product');
const { Op } = require('sequelize');

  const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await VariantProduct.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: Price },
            { model: Stock }
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

const getAllProduct = catchError(async(req, res) => {
    const {productId} = req.body;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await VariantProduct.findAndCountAll({
        limit: pageSize,
        offset: offset,
        where: {productId},
        include: [
            { model: Price },
            { model: Stock }
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

const create = catchError(async(req, res) => {
    let {variantProduct, price, stock, productId, companyId} = req.body;
    // console.log("body", 
    //     JSON.parse(variantProduct), 
    //     JSON.parse(price), 
    //     JSON.parse(stock), 
    //     JSON.parse(productId), 
    //     JSON.parse(companyId))
    const transaction = await sequelize.transaction();

    try{
        const files = req.files;
        console.log('files', files)
        const urls = [];
        for (const file of files) {
            const { secure_url } = await uploadToCloudinary(file);//secure_url
            urls.push(secure_url);
        }
        console.log('urls', urls)

        const variant = await VariantProduct.create(
            {...JSON.parse(variantProduct), imageURL: urls[0], isActive: true, productId: JSON.parse(productId), companyId: JSON.parse(companyId)},
            {transaction});
        console.log("variant", variant)

        const stocks = await Stock.create(
            {...JSON.parse(stock), variantProductId: variant.id, companyId: ''},
            {transaction});
        console.log("stocks", stocks)

        const prices = await Price.create(
            {...JSON.parse(price), variantProductId: variant.id},
            {transaction});
        console.log("prices", prices)

        await transaction.commit();
        return res.status(200).json({
            variantProduct: variant,
            Stock: stocks,
            Price: prices
        });
    } catch (error){
        await transaction.rollback();
        return res.status(404).json({message: "Error al guardar los datos  de la variante del producto", error });
    }
});

  const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await VariantProduct.findByPk({
        where: id,
        include: [
            { model: Price },
            { model: Stock }
        ],
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await VariantProduct.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {variantProduct, stock, price, stockId, priceId} = req.body;
    const transaction = await sequelize.transaction();

    try{
        const variamnt = await VariantProduct.update(
            {...variantProduct},
            { where: {id}, returning: true },
            {transaction}
        );

        const stocks = await Stock.update(
            {...stock},
            { where: {id: stockId}, returning: true },
            {transaction}
        );

        const prices = await Price.update(
            {...price},
            { where: {id: priceId}, returning: true },
            {transaction}
        );

        // Confirmar la transacción si todo es exitoso
        await transaction.commit();
        return res.status(200).json({
            variantProduct: variamnt,
            Stock: stocks,
            Price: prices
        });
    
    }catch(error){
        await transaction.rollback();
        return res.status(404).json({message: "Error al actualizar los datos de la variante del producto", error });
    }
});

const updateFile = catchError(async(req, res) => {
    const { id } = req.params;
    console.log("id: ", id)
    const {variantProduct, stock, price, stockId, priceId} = req.body;
    console.log("datos:", JSON.parse(variantProduct), JSON.parse(price), JSON.parse(stock), JSON.parse(priceId), JSON.parse(stockId))
    const transaction = await sequelize.transaction();
    try{
      const files = req.files;
      // console.log('files', files)
      const urls = [];
      for (const file of files) {
          const { secure_url } = await uploadToCloudinary(file);//secure_url
          urls.push(secure_url);
      }
      console.log('urls', urls)
      
      const variamnt = await VariantProduct.update(
            {...JSON.parse(variantProduct), imageURL: urls[0]},
            { where: {id}, returning: true },
            {transaction}
        );

        const stocks = await Stock.update(
            {...JSON.parse(stock)},
            { where: {id: JSON.parse(stockId)}, returning: true },
            {transaction}
        );

        const prices = await Price.update(
            {...JSON.parse(price)},
            { where: {id: JSON.parse(priceId)}, returning: true },
            {transaction}
        );

        // Confirmar la transacción si todo es exitoso
        await transaction.commit();
        return res.status(200).json({
            variantProduct: variamnt,
            Stock: stocks,
            Price: prices
        });
    } catch (error) {
      return res.status(404).json({message: "Error al actualizar la variante del producto", error });
    }
  });

  const getAllSearch = catchError(async(req, res) => {
    const { query, companyId } = req.body;
    const result = await VariantProduct.findAll({
        include: [
            { model: Product },
            { model: Stock },
            { model: Price },
        ],
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { description: { [Op.iLike]: `%${query}%`}  },
                        { '$product.name$': { [Op.iLike]: `%${query}%`}  }
                    ]
                },
                {
                    [Op.or]: [
                        { companyId:  companyId },
                        // { '$product.companyId$':  companyId }
                    ]
                }
            ]
        },
        subQuery: false,
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    updateFile,
    getAllProduct,
    getAllSearch, 
}