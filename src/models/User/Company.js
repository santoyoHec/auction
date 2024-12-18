const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Address = require('../Address/Address')
const User = require('./User')
const Market = require('../../models/Market/Market')
const Sumary = require('../../models/Order/SummaryTransaction');
const Sector = require("./Sectror");
const Document = require("./Document");

const Company = sequelize.define(
  "company",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Persona física o moral",
    },
    legalId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "RFC/VAT/Numero de identificacion",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    webSite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //addressId
    //userId
    //marketId
    //summaryId
  },
  {
    tableName: "company",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Address
Company.hasMany(Address);
Address.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasOne(Address, { foreignKey: 'addressId' });
// Address.belongsTo(Company, { foreignKey: 'addressId' });

//User
Company.hasMany(User);
User.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasMany(User, { foreignKey: 'userId' });
// Company.belongsTo(User, { foreignKey: 'userId' });

//Market
Company.hasMany(Market)
Market.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasMany(Market, { foreignKey: 'marketId' });
// Company.belongsTo(Market, { foreignKey: 'marketId' });

//Sumary
Company.hasMany(Sumary)
Sumary.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasMany(Sumary, { foreignKey: 'sumaryId' });
// Company.belongsTo(Sumary, { foreignKey: 'sumaryId' });

//Documents
Company.hasOne(Document)
Document.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasOne(Document, { foreignKey: 'documentId' });
// Document.belongsTo(Company, { foreignKey: 'documentId' });

//Sector
Company.hasOne(Sector)
Sector.belongsTo(Company, { foreignKey: 'companyId' });
// Company.hasOne(Sector, { foreignKey: 'sectorId' });
// Sector.belongsTo(Company, { foreignKey: 'sectorId' });

module.exports = Company;
