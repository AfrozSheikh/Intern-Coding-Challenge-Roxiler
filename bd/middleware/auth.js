import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import db from '../config/db.js';

export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(token, config.jwt.secret);
    const user = await db.User.findByPk(payload.sub, { attributes: ['id', 'name', 'email', 'role'] });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized', error: e.message });
  }
};
