const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Warehouse = sequelize.define("warehouse",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Llave primaria de almacen"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Nombre del almacen"
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: "Precio que maneja el almacen"
    },
    capacity: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Capacidad que maneja del almacen"
    },
    //Addressid
    //userId
  },
  {
    tableName: "warehouse",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Warehouse;
