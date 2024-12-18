const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Shipping = sequelize.define("shipping",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Llave primaria de la tabla shipping"
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Estatus del envió"
    },
    shipDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha del envió"
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha de la entrega"
    },
    cancelDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Fecha de cancelación de la entrega"
    },
    attempts: { //Ver si se van a agregar inentos de entrega
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Intentos de la entrega"
    },
  },
  {
    tableName: "shipping",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Shipping;
