const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hash,
    role: role || 'user'
  });

  res.status(201).json({ message: 'User created' });
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
