const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');


exports.signup = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hashed,
      role: 'user'
    });
    res.json({ id: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("JWT SECRET:", process.env.JWT_SECRET);

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id', 'email', 'role'] });
  res.json(user);
};
