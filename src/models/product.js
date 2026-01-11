const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // will be used later for OrderItem
    }
  }

  Product.init({
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0 } }
  }, {
    sequelize,
    modelName: 'Product'
  });

  return Product;
};
