const express = require("express");
const cors = require("cors");
require("dotenv").config();

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


// Debug route to list all users
app.get('/debug/users', async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'email', 'role'] });
  res.json(users);
});


module.exports = app;
