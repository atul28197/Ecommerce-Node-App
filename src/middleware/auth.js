const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const hdr = req.headers.authorization;
  if (!hdr) return res.status(401).json({ error: 'Unauthorized' });

  const token = hdr.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
