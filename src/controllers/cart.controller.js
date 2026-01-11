const cartService = require('../services/cart.service');

exports.add = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user.id;

  if (!productId) return res.status(400).json({ error: 'productId required' });

  await cartService.addItem(userId, productId, qty);
  res.json({ message: 'Added to cart' });
};

exports.list = async (req, res) => {
  const userId = req.user.id;
  const items = await cartService.getCart(userId);
  res.json(items);
};

exports.clear = async (req, res) => {
  const userId = req.user.id;
  await cartService.clearCart(userId);
  res.json({ message: 'Cart cleared' });
};
