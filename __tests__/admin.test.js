const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const bcrypt = require('bcrypt');

let adminToken;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Create admin
  await db.User.create({
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin'
  });


  const loginAdmin = await request(app).post('/auth/login').send({ email: 'admin@example.com', password: 'admin123' });
  adminToken = loginAdmin.body.token;
});

afterAll(async () => {
  await db.sequelize.close();
});

it('admin can view report', async () => {
  const res = await request(app).get('/admin/report').set('Authorization', `Bearer ${adminToken}`);
  expect(res.body.discountCodes).toBeInstanceOf(Array);
});
