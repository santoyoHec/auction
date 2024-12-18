const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Rol = sequelize.define(
  "rol",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    tableName: "rol",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Rol;
