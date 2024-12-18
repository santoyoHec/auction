const catchError = require('../../utils/catchError');
const Auction = require('../../models/Auction/Auction');
const AuctionInvitation = require('../../models/Auction/AuctionInvitation');
const Company = require('../../models/User/Company');
const VariantProduct = require('../../models/Product/VariantProduct');
const Price = require('../../models/Product/Price');
const Stock = require('../../models/Product/Stock');
const Product = require('../../models/Product/Product');
const Category = require('../../models/Product/Category');
const { Op, literal, col } = require('sequelize');
const sequelize = require("../../utils/connection");
const AuctionGuest = require('../../models/Auction/AuctionGuest');
const User = require('../../models/User/User');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await AuctionInvitation.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: Auction },
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

const getAllCompany = catchError(async(req, res) => {
    const { companyId } = req.body;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const send = new Date();
    const year = send.getFullYear();
    const mes = String(send.getMonth() + 1).padStart(2, '0');
    const dia = String(send.getDate()).padStart(2, '0');
    const startOfDay = `${year}-${mes}-${dia} 00:00:00`;
    const endOfDay = `${year}-${mes}-${dia} 23:59:59`;
    const results = await AuctionInvitation.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: Auction,
                where: {
                    openAuction: false,
                    startDate: { [Op.lte]: startOfDay } ,
                    endDate: { [Op.gte]: endOfDay },
                },
                include: [
                    { model: Company,
                        include: [
                            { model: User,
                                where: {isAdmin: true}
                             }
                        ]
                     },
                    { model: VariantProduct, 
                        include: [
                            { model: Price },
                            { model: Stock },
                            { model: Product, 
                                include: [
                                    { model: Category }
                                ]
                             },
                        ]
                     },
                ]
             },
        ],
        where: {
            companyId
        },
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
    let { auctionId, companyId, sendDate} = req.body;
    console.log("companyId", companyId)
    const query = await AuctionInvitation.findAndCountAll({
        where: {
            auctionId,
            companyId
            }
        })
    console.log("query", query.count)

    if(query.count > 0){
        return res.status(201).json({mensaje: 'Ya se había mandado la invitación a la compañia', query});
    }

    const result = await AuctionInvitation.create({
        sendDate,
        status: 'Enviada',
        auctionId, 
        companyId
    });

    if(!result) return res.status(404).json({ message: "Error al guardar los datos de la invitación a la subasta", result });
    return res.status(201).json({mensaje: 'Se mando la invitación a la compañia',result});
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await AuctionInvitation.findByPk({id, 
        include: [
        { model: AuctionGuest },
    ]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await AuctionInvitation.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await AuctionInvitation.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const responseInvitation = catchError(async(req, res) => {
    const { id } = req.params;
    const { respuesta, auctionId, userId } = req.body;
    const transaction = await sequelize.transaction();
    const send = new Date();
    const year = send.getFullYear();
    const mes = String(send.getMonth() + 1).padStart(2, '0');
    const dia = String(send.getDate()).padStart(2, '0');
    const responseDate = `${year}-${mes}-${dia} 00:00:00`;
    try {
        var cont = ''; 
        const gues = await AuctionGuest.findAndCountAll({ where: { auctionId, userId } })
        if (respuesta) {
            cont = 'Aceptada';
            if (gues.count == 0) {
                await AuctionGuest.create(
                    { auctionId, userId, type: ' ' },
                    { transaction }
                );
            }
        } else { 
            cont = 'Denegada';
            if (gues.count > 0) {
                await AuctionGuest.destroy(
                    {
                        where: {auctionId, userId},
                        transaction
                    }
                );
            }
        }
        const result = await AuctionInvitation.update(
            { 
                status: cont,
                responseDate
             }, 
            { 
                where: { id },
                transaction
             }
        );
        await transaction.commit();
        return  res.status(200).json({invitation: result});

    } catch (error){
        if (!transaction.finished) {
        await transaction.rollback();
        }
        console.error("Error durante la transacción:", error);
        return res.status(404).json({ message: "Error al mandar la respuesta a la invitación de la subasta", error });
    }
    
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getAllCompany,
    responseInvitation,
}