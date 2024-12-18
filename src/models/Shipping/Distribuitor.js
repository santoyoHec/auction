const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Distribuitor = sequelize.define("distribuitor",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Llave primaria de la tabla distribuitor"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Nombre del distribuidor"
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: "Precio que maneja el distribuidor"
    },
    capacity: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Capacidad que maneja el distribuidor"
    },
    vehicleType: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Tipo de vehiculo que maneja el distribuidor"
    },
    //Addressid
    //userId
  },
  {
    tableName: "distribuitor",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Distribuitor;
