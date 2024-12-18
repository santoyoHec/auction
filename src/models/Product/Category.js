const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Category = sequelize.define("category",{
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //ProductId
  },
  {
    tableName: "category",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Category;
