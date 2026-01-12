const { sequelize, CartItem, Product, Order, OrderItem, DiscountCode } = require('../db');

const DISCOUNT_PERCENT = 0.10;
const NTH = process.env.DISCOUNT_NTH || 5;

async function checkout(userId, code) {
  return await sequelize.transaction(async (t) => {
    const cart = await CartItem.findAll({
      where: { userId },
      include: [ Product ],
      transaction: t
    });

    if (!cart.length) throw new Error('Cart empty');

    const subtotal = cart.reduce((sum, item) => {
      return sum + item.qty * item.Product.price;
    }, 0);

    let discount = 0;
    let discountCodeId = null;

    if (code) {
      const d = await DiscountCode.findOne({ where: { code, isUsed: false }, transaction: t });
      if (!d) throw new Error('Invalid or already used discount code');

      discount = subtotal * DISCOUNT_PERCENT;
      discountCodeId = d.id;

        await d.update({
        isUsed: true,
        usedAt: new Date()
      }, { transaction: t });
    }

    const total = subtotal - discount;

    const order = await Order.create({
      userId,
      subtotal,
      discount,
      total,
      discountCodeId
    }, { transaction: t });

    for (const item of cart) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        qty: item.qty,
        price: item.Product.price
      }, { transaction: t });
    }

    await CartItem.destroy({ where: { userId }, transaction: t });


    return order.get({ plain: true });
  });
}

module.exports = { checkout };
