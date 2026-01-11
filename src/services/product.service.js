const { Product } = require('../db');

async function list() {
  return Product.findAll();
}

async function create(data) {
  return Product.create(data);
}

async function get(id) {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product;
}

async function update(id, data) {
  const product = await get(id);
  return product.update(data);
}

async function remove(id) {
  const product = await get(id);
  return product.destroy();
}

module.exports = { list, create, get, update, remove };
