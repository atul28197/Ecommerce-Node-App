const checkoutService = require('../services/checkout.service');

exports.checkout = async (req, res) => {
  try {
    const code = req.body?.code ?? null;
    const order = await checkoutService.checkout(req.user.id, code);
    console.log('ORDER RETURN:', order);
    res.json({
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

