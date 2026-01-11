const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
      Order.belongsTo(models.DiscountCode, { foreignKey: 'discountCodeId' });
    }
  }

  Order.init({
    userId: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order'
  });

  return Order;
};
