const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiscountCode extends Model {}

  DiscountCode.init({
    code: { type: DataTypes.STRING, unique: true },
    isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
    usedAt: { type: DataTypes.DATE, allowNull: true }
  }, {
    sequelize,
    modelName: 'DiscountCode'
  });

  return DiscountCode;
};
