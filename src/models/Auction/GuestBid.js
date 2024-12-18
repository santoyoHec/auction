const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const GuestBid = sequelize.define("guestBid",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador e la puja en la subasta",
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Cantidad de la puja en la subasta",
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Fecha de la puja en la subasta",
    },
    winnerBid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: "Puja ganadora de la puja en la subasta",
    },
  },
  {
    tableName: "guestBid",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = GuestBid;
