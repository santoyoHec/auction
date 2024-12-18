const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Compra/Venta/Subasta/RFQ",
    },
    originClient: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Persona que inicia la transaccion",
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Persona que la recibe",
    },
    dateOrder: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Estado Orden",
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Estado pago",
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Metodo de pago",
    },
    //orderDetail
  },
  {
    tableName: "order",
    freezeTableName: true,
    timestamps: true,
    createdAt: "createdOrder",
    updatedAt: "updatedOrder",
  }
);
module.exports = Order;
