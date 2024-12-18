const { DataTypes, UUID } = require("sequelize");
const sequelize = require("../../utils/connection");

const Sector = sequelize.define(
  "sector",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    agricultureLivistock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    aerospaceDefese: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    automotive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    constructionMaterial: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    educationEntretainment: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    financialBanking: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    govermentPublicAdministration: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hospitalityTourism: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    insurance: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    mediaTraining: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    socialServicesNonprofits: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    telecommunications: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    wasteManagement: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    chemicalsPlastic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    consumerGoodsServices: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    enerfyPublicServices: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    FoodDronks: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    HealthCare: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    informationTechnologies: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    legalServices: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    miningMetallurgy: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    retailWholesale: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    transportationLogistics: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
  },
  {
    tableName: "sector",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
module.exports = Sector;
