const catchError = require('../../utils/catchError');
const Company = require('../../models/User/Company');
const User = require('../../models/User/User');
const Address = require('../../models/Address/Address');
const Document = require('../../models/User/Document');
const Sector = require('../../models/User/Sectror');
const sequelize = require("../../utils/connection");
const bcrypt = require("bcrypt");
const {
    uploadToCloudinary,
    deleteFromCloudinary,
  } = require("../../utils/cloudinary");
const { Op, literal, col } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await User.findAndCountAll({
        limit: pageSize,
        offset: offset,
        include: [
            { model: User }
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

const create2 = catchError(async (req, res) => {
    const files = req.files;
    console.log('files', files)
    const urls = [];
    try{
    for (const file of files) {
        const res = await uploadToCloudinary(file);
        console.log('res', res)
        urls.push(res.url);
    }
    console.log('urls', urls)
    return res.status(200).json(urls)
   }catch (error){
    return res.status(500).json({ message: 'Error al subir archivos', error });
   }
});

const create = catchError(async (req, res) => {
    //Datos a guardar
    const { users, companys, address, sector } = req.body;
    // console.log("datos: ", JSON.parse(users), JSON.parse(companys), JSON.parse(address), JSON.parse(sector))
    const ussse = JSON.parse(users);
    const transaction = await sequelize.transaction();
    try{
        //Guardar las imagenes
        const files = req.files;
        // console.log('files', files)
        const urls = [];
        for (const file of files) {
            const { secure_url } = await uploadToCloudinary(file);//secure_url
            urls.push(secure_url);
        }
        // console.log('urls', urls)

        // Crear Company y asociarla con Address
        const comp = await Company.create({
            ...JSON.parse(companys),
            // addressId: addr.id,
            urlImg: urls[1],
            isVerified: false
        }, { transaction });
        // console.log('company')

        // Crear Address
        const addr = await Address.create({
            ...JSON.parse(address), 
            companyId: comp.id
        }, { transaction });
        // console.log('address')

        // Crear Document asociado con Company
        const doc = await Document.create({
            taxStatus: urls[2],
            address: urls[3],
            bankDetails: urls[4],
            policies: urls[5],
            constitutiveAct: urls[6],
            legalPower: urls[7],
            companyId: comp.id
        }, { transaction });
        // console.log('documents')

        // Crear Sector asociado con Company
        const sec = await Sector.create({
            ...JSON.parse(sector),
            companyId: comp.id
        }, { transaction });
        // console.log('sector')

        // Crear User asociado con Company
        
        const encriptedPassword = await bcrypt.hash(ussse.password, 10);
        const uss = await User.create({
            ...JSON.parse(users),
            companyId: comp.id,
            isAdmin: true,
            status: "Active",
            urlImg: urls[0],
            password: encriptedPassword,
            firstName: ussse.firstName,
            lastName: ussse.lastName,
            email: ussse.email,
            userName: ussse.userName,
            phone: ussse.phone,
            timeZone: ussse.timeZone,
            language: ussse.language,
            referenceCurrency: ussse.referenceCurrency,
            dateOfBirth: ussse.dateOfBirth,
            position: ussse.position,
        }, { transaction });
        // console.log('user')

        // Confirmar la transacción si todo es exitoso
        await transaction.commit();
        return res.status(200).json({
            address: addr,
            company: comp,
            document: doc,
            sector: sec,
            user: uss
        });
    } catch (error) {
        // Revertir la transacción si hay algún error
        await transaction.rollback();
        // console.error('Error al crear los registros:', error);
        return res.status(400).json({ message: "Error al guardar los datos", error });
    }
});


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Company.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Company.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Company.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const getAllRegister = catchError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    // console.log("datos", page, pageSize, offset)
    const results = await Company.findAndCountAll({
        limit: pageSize,
        offset: offset
    });

    if(!results) {
        return res.status(401).json({ message: "Error al consultar las compañias", error: results });
    }

    const response = {
    totalRecords: results.count,
    totalPages: Math.ceil(results.count / pageSize),
    currentPage: page,
    pageSize: pageSize,
    data: results.rows,
    };
    return res.json(response);
});

const getOneWithAddress = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Company.findAll({
        where: { id },
        include: [{ 
            model: Address,
            where:{mainAddress: true}
         }]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const updateStatus = catchError(async(req, res) => {
    const { id, isVerified } = req.body;
    console.log("datos", id, isVerified)
    const result = await Company.update(
        {isVerified},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) {
        return res.status(401).json({ message: "Error al actualizar las compañias", error: result });
    }
    return res.json(result[1][0]);
});

const updateCompanyData = catchError(async(req, res) => {
    const {company} = req.body;
    const { id } = req.params;
    const result = await Company.update(
        {...company}, 
        {where: {id}, returning: true}
    );
    if(result[0] === 0) {
        return res.status(401).json({ message: "Error al actualizar la compañia", error: result });
    }
    return res.json({Address: result[1][0]});
});

const updateCompanyDataFile = catchError(async(req, res) => {
    const { company, id } = req.body;
    console.log("datos:", JSON.parse(company), JSON.parse(id))
    try{
        //Guardar las imagenes
        const files = req.files;
        const urls = [];
        for (const file of files) {
            const { secure_url } = await uploadToCloudinary(file);//secure_url
            urls.push(secure_url);
        }
        console.log('urls', urls)

        const companys = await Company.update(
            {...JSON.parse(company), urlImg: urls[0]},
            {where: { id: JSON.parse(id)}});
        return res.status(200).json({ company: companys });
    } catch (error) {
        return res.status(400).json({ message: "Error al actualizar los datos de la compañia", error });
    }
});

const getAllSearch = catchError(async(req, res) => {
    const { query, companyId } = req.body;
    const result = await Company.findAll({
        include: [
            {model: User}
        ],
        where: {
            name: { [Op.iLike]: `%${query}%`},
            id: {
                [Op.ne]: companyId, 
            },
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
    create2,
    getAllRegister,
    getOneWithAddress,
    updateStatus,
    updateCompanyData,
    updateCompanyDataFile,
    getAllSearch,
}