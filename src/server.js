const app = require('./app');
const db = require('./db');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3000;

async function seedAdmin() {
  const { User } = db;
  const exists = await User.findOne({ where: { email: 'admin@example.com' }});
  if (!exists) {
    await User.create({
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });
    console.log('Admin seeded.');
  }
}

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected.');

    // sqlite in-memory → create fresh tables
    await db.sequelize.sync({ force: true });
    console.log('DB synchronized.');

    // seed data after sync (important!)
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();
