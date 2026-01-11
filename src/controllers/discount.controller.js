const { DiscountCode,Order } = require('../db');

exports.listAll = async (req, res) => {
  const codes = await DiscountCode.findAll({
    attributes: ['code', 'isUsed', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']]
  });

  res.json(codes);
};

exports.generateIfEligible = async (req, res) => {

  const NTH = Number(process.env.DISCOUNT_NTH || 5);

  const totalOrders = await Order.count();

  if (totalOrders === 0 || totalOrders % NTH !== 0) {
    return res.status(400).json({
      error: `Not eligible. Next eligible at order #${Math.ceil((totalOrders + 1) / NTH) * NTH}`
    });
  }

  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  const dc = await DiscountCode.create({ code });

  res.json({
    message: 'Discount code generated.',
    code: dc.code
  });
};