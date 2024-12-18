const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
// const Metafield = require('./MetaField')
// const VariantProduct = require('./VariantProduct');
const Category = require("./Category");
const Company = require("../User/Company")

const Product = sequelize.define("product",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    // sku: {
    //   type: DataTypes.STRING,
    //   comment: "16 caracteres",
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // categoryId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: Category,
    //     key: 'id'
    //   }
    // },
    // companyId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: Company,
    //     key: 'id'
    //   }
    // },
    //MetaField ---> unitOfMeasurement
    //PricesId
    //Stock
    //VariantId
  },{
    tableName: "product",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// //Metafield
// Product.hasMany(Metafield, { foreignKey: 'productId' })
// Product.belongsTo(Metafield, { foreignKey: 'productId' });

//Variant
// Product.hasMany(VariantProduct, { foreignKey: 'productId' })
// Product.belongsTo(VariantProduct, { foreignKey: 'productId' });

//Producto
Category.hasMany(Product)
Product.belongsTo(Category, { foreignKey: 'categoryId' });

//Company
Company.hasMany(Product)
Product.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Product;
