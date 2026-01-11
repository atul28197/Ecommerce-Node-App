const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' });
  }
};
