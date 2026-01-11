const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });  // create tables automatically

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
