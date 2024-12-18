const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/connection");
const Order = require('./Order')

const OrderDetail = sequelize.define(
  "orderDetail",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Valor unitario"
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "orderDetail",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//Order
Order.hasMany(OrderDetail, { foreignKey: 'orderId' })
Order.belongsTo(OrderDetail, { foreignKey: 'orderId' });
// Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
// Order.belongsTo(OrderDetail, { foreignKey: 'orderId' });

module.exports = OrderDetail;
