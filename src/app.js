const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { swaggerUi, swaggerSpec } = require('./swagger');


// The database instance
const db = require('./db');
const { User } = db;

const app = express();

app.use(cors());
app.use(express.json());

// health route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);


const productRoutes = require('./routes/product.routes');
app.use('/products', productRoutes);


const cartRoutes = require('./routes/cart.routes');
app.use('/cart', cartRoutes);


const checkoutRoutes = require('./routes/checkout.routes');
app.use('/checkout', checkoutRoutes);

// To Debug route to get discounts code generated
const adminRoutes = require('./routes/admin.routes');
app.use('/admin', adminRoutes);




// To Debug route to list all users in the system
app.get('/debug/users', async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'email', 'role'] });
  res.json(users);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
