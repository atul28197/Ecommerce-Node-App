await queryInterface.createTable('DiscountCodes', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  code: { type: Sequelize.STRING, unique: true },
  isUsed: { type: Sequelize.BOOLEAN, defaultValue: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
