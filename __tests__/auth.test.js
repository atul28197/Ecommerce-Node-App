const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  const bcrypt = require('bcrypt');

  await db.User.create({
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin'
  });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('Auth', () => {
  it('should signup user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ email: 't@t.com', password: '123456' });

    expect(res.status).toBe(200);
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 't@t.com', password: '123456' });

    expect(res.body.token).toBeDefined();
  });
});
