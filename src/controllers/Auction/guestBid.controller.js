const catchError = require('../../utils/catchError');
const GuestBid = require('../../models/Auction/GuestBid');
const AuctionGuest = require('../../models/Auction/AuctionGuest');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    //Recibe el id de la subasta
    let auctionId = req.body.auctionId;
    const results = await GuestBid.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: AuctionGuest, where: auctionId }
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

const getWinner = catchError(async(req, res) => {
    //Recibe el id de la subasta
    let auctionId = req.body.auctionId;
    let winnerBid = true;
    const results = await GuestBid.findOne({
        where: winnerBid, 
        include: [ 
            {model: AuctionGuest, where: auctionId} 
    ]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    //En el body debe de llevar la id de la subasta
    const result = await GuestBid.create(req.body);
    return res.status(201).json(result);
});

//Tal vez se vaya
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await GuestBid.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await GuestBid.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await GuestBid.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getWinner,
}