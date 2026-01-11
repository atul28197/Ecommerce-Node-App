const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected.');

    await db.sequelize.sync(); // sqlite: create tables in memory
    console.log('DB synchronized.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();
