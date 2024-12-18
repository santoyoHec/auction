const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Address = require('../Address/Address')
const Summary = require('../Order/SummaryTransaction')
const Rol = require('./Rol');

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceCurrency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    //addressId
    //summaryId
    //rolId
  },
  {
    tableName: "user",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Address
User.hasMany(Address)
User.belongsTo(Address, { foreignKey: 'addressId' });
// Address.hasOne(User)
// User.hasMany(Address, { foreignKey: 'userId' });
// User.belongsTo(Address, { foreignKey: 'userId' });

//Sumary
User.hasMany(Summary)
Summary.belongsTo(User, { foreignKey: 'userId' });
// Summary.hasOne(User)
// User.hasMany(Summary, { foreignKey: 'userId' });
// User.belongsTo(Summary, { foreignKey: 'userId' });

//Rol
User.hasMany(Rol)
User.belongsTo(Rol, { foreignKey: 'userId' });
// Rol.hasMany(User)
// User.hasMany(Rol, { foreignKey: 'userId' });
// User.belongsTo(Rol, { foreignKey: 'userId' });

module.exports = User;
