const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const Address = require("./Address");

const AddressType = sequelize.define(
  "addressType",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    addressType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "addressType",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Address.hasOne(AddressType)
// Address.belongsTo(AddressType, { foreignKey: 'addressTypeId' });
// Address.hasOne(AddressType, { foreignKey: 'addressId' });
// Address.belongsTo(AddressType, { foreignKey: 'addressId' });

module.exports = AddressType;
