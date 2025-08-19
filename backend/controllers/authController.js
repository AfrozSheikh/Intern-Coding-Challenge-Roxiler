import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import db from '../config/db.js';
import { ROLES } from '../models/User.js';

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role });

export const signup = async (req, res) => {
  const { name, email, address, password } = req.body;
  console.log(req.body);
  
  const exists = await db.User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.User.create({ name, email, address, passwordHash, role: ROLES.USER });
  return res.status(201).json({ user: publicUser(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, role: user.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
  return res.json({ token, user: publicUser(user) });
};

export const changePassword = async (req, res) => {
  const { oldPassword, password } = req.body;
  const user = await db.User.findByPk(req.user.id);
  const ok = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Old password incorrect' });

  user.passwordHash = await bcrypt.hash(password, 10);
  await user.save();
  res.json({ message: 'Password updated' });
};
