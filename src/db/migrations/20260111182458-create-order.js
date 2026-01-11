await queryInterface.createTable('Orders', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: Sequelize.INTEGER },
  subtotal: Sequelize.FLOAT,
  discount: Sequelize.FLOAT,
  total: Sequelize.FLOAT,
  discountCodeId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
