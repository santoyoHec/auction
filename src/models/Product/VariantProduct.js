const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const Stock = require("./Stock");
const Product = require("./Product");
const Company = require("../User/Company");
const Auction = require("../Auction/Auction");

const VariantProduct = sequelize.define("variantProduct",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    sku: {
      type: DataTypes.STRING,
      comment: "16 caracteres",
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    //metaField
    //PricesId
    //Stock
  },
  {
    tableName: "variantProduct",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Price
// VariantProduct.hasMany(Price)
// VariantProduct.belongsTo(Price, { foreignKey: 'variantProductId' });

//Stock
// VariantProduct.hasMany(Stock)
// VariantProduct.belongsTo(Stock, { foreignKey: 'variantProductId' });

//Product
Product.hasMany(VariantProduct, {as: 'variants'})
VariantProduct.belongsTo(Product);

//Company
Company.hasMany(VariantProduct)
VariantProduct.belongsTo(Company, { foreignKey: 'companyId' });

//Stock
VariantProduct.hasMany(Stock, { foreignKey: 'variantProductId' });
Stock.belongsTo(VariantProduct, { foreignKey: 'variantProductId' });

//Aucion
VariantProduct.hasMany(Auction);
Auction.belongsTo(VariantProduct, { foreignKey: 'variantProductId' });

module.exports = VariantProduct;
