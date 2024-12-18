const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");
const Auction = require("./Auction");
const GuestBid = require("./GuestBid");
const User = require("../User/User");

const AuctionGuest = sequelize.define("auctionGuest",{
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      comment: "Identificador de los invitados a la subasta",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "tipo de los invitados a la subasta",
    },
    //auction
    //user
    //company
  },
  {
    tableName: "auctionGuest",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

//
Auction.hasMany(AuctionGuest)
AuctionGuest.belongsTo(Auction, { foreignKey: 'auctionId' });
// Auction.hasMany(AuctionGuest, { foreignKey: 'auctionId' });
// Auction.belongsTo(AuctionGuest, { foreignKey: 'auctionId' });

//Usuario
User.hasMany(AuctionGuest)
AuctionGuest.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(AuctionGuest, { foreignKey: 'userId' } )
// User.belongsTo(AuctionGuest, { foreignKey: 'userId' });

//
AuctionGuest.hasMany(GuestBid)
GuestBid.belongsTo(AuctionGuest, { foreignKey: 'auctionGuestId' });
// AuctionGuest.hasMany(GuestBid, { foreignKey: 'guestId' });
// AuctionGuest.belongsTo(GuestBid, { foreignKey: 'guestId' });

module.exports = AuctionGuest;
