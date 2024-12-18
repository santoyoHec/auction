const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Market = sequelize.define(
  "market",
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
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //CategoriesId --> ProductsId ---> (PricesId && Stock) && VariantsId ---> (PricesId && Stock)
    //ClientsId
  },
  {
    tableName: "market",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Market;
