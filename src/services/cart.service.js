const { CartItem, Product } = require('../db');

async function addItem(userId, productId, qty = 1) {
  // upsert behavior if product already in cart
  const existing = await CartItem.findOne({ where: { userId, productId } });

  if (existing) {
    return existing.update({ qty: existing.qty + qty });
  }

  return CartItem.create({ userId, productId, qty });
}

async function getCart(userId) {
  return CartItem.findAll({
    where: { userId },
    include: [{ model: Product }]
  });
}

async function clearCart(userId) {
  return CartItem.destroy({ where: { userId } });
}

module.exports = { addItem, getCart, clearCart };
