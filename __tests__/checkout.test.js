const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const bcrypt = require('bcrypt');

let userToken;
let adminToken;
let discountCode;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Create admin
  await db.User.create({
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin'
  });

  // Create user
  await request(app).post('/auth/signup')
    .send({ email: 'user@test.com', password: '123456' });

  const loginUser = await request(app).post('/auth/login')
    .send({ email: 'user@test.com', password: '123456' });

  userToken = loginUser.body.token;

  const loginAdmin = await request(app).post('/auth/login')
    .send({ email: 'admin@example.com', password: 'admin123' });

  adminToken = loginAdmin.body.token;

  // Create product
  await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ title: 'Cup', price: 10 });
});

afterAll(async () => {
  await db.sequelize.close();
});

it('checkout without discount', async () => {
  await request(app)
    .post('/cart/add')
    .set('Authorization', `Bearer ${userToken}`)
    .send({ productId: 1, qty: 2 });

  const res = await request(app)
    .post('/checkout')
    .set('Authorization', `Bearer ${userToken}`);

  expect(res.body.total).toBe(20);
});

it('generate discount code & use it', async () => {
  for (let i = 0; i < 4; i++) {
    await request(app)
      .post('/cart/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId: 1, qty: 1 });

    await request(app)
      .post('/checkout')
      .set('Authorization', `Bearer ${userToken}`);
  }

  await request(app)
    .post('/admin/discount-codes/generate')
    .set('Authorization', `Bearer ${adminToken}`);

  const report = await request(app)
    .get('/admin/report')
    .set('Authorization', `Bearer ${adminToken}`);

  discountCode = report.body.discountCodes[0].code;

  await request(app)
    .post('/cart/add')
    .set('Authorization', `Bearer ${userToken}`)
    .send({ productId: 1, qty: 2 });

  const res = await request(app)
    .post('/checkout')
    .set('Authorization', `Bearer ${userToken}`)
    .send({ code: discountCode });

  expect(res.body.discount).toBe(2);
  expect(res.body.total).toBe(18);
});
