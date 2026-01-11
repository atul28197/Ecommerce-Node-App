await queryInterface.createTable('OrderItems', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: Sequelize.INTEGER,
  productId: Sequelize.INTEGER,
  price: Sequelize.FLOAT,
  qty: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
