const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const Product = require("./Product");

const MetaField = sequelize.define("metaField",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Es el nombre clave que se le de",
    },
    detailType: {
      type: DataTypes.STRING,
      allowNull: false,
      //Tenemos que hacer la lista desplegable
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Define a que grupo pertenece",
    },
  },
  {
    tableName: "metaField",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Metafield
Product.hasMany(MetaField)
// Product.belongsTo(MetaField, { foreignKey: 'productId' });

module.exports = MetaField;
