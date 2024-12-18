const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Document = sequelize.define(
  "document",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador de la tabla"
    },
    taxStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "comprobante de situación fiscal"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Comprobante de domicilio"
    },
    bankDetails: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Carta o caratula de datos bancarios"
    },
    policies: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Politicas"
    },
    constitutiveAct: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Acta Constitutiva"
    },
    legalPower: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Poder del representante legal"
    },
  },
  {
    tableName: "document",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Document;
