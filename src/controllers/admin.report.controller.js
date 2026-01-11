const { Order, OrderItem, DiscountCode } = require('../db');

exports.getReport = async (req, res) => {
  const totalItemsSold = await OrderItem.sum('qty') || 0;
  const totalPurchaseAmount = await Order.sum('subtotal') || 0;
  const totalDiscountAmount = await Order.sum('discount') || 0;
  const discountCodes = await DiscountCode.findAll({
    attributes: ['code', 'isUsed', 'createdAt', 'usedAt']
  });

  res.json({
    totalItemsSold,
    totalPurchaseAmount,
    totalDiscountAmount,
    discountCodes
  });
};
