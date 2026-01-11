const productService = require('../services/product.service');

exports.list = async (req, res) => {
  const products = await productService.list();
  res.json(products);
};

exports.create = async (req, res) => {
  const { title, price } = req.body;

  if (!title || price == null) {
    return res.status(400).json({ error: 'title and price required' });
  }

  const product = await productService.create({ title, price });
  res.status(201).json(product);
};

exports.get = async (req, res) => {
  try {
    const product = await productService.get(req.params.id);
    res.json(product);
  } catch (_) {
    res.status(404).json({ error: 'Product not found' });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.json(product);
  } catch (_) {
    res.status(404).json({ error: 'Product not found' });
  }
};

exports.remove = async (req, res) => {
  try {
    await productService.remove(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (_) {
    res.status(404).json({ error: 'Product not found' });
  }
};
