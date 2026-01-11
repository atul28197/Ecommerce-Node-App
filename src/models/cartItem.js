const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.User, { foreignKey: 'userId' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  CartItem.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, {
    sequelize,
    modelName: 'CartItem'
  });

  return CartItem;
};
