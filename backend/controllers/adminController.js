import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { Op, fn, col, literal } from 'sequelize';

export const dashboardStats = async (_req, res) => {
  const [users, stores, ratings] = await Promise.all([
    db.User.count(),
    db.Store.count(),
    db.Rating.count()
  ]);
  res.json({ totalUsers: users, totalStores: stores, totalRatings: ratings });
};

export const createUser = async (req, res) => {
  const { name, email, address, password, role } = req.body;
  const exists = await db.User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.User.create({ name, email, address, passwordHash, role });
  res.status(201).json({ id: user.id, name, email, address, role });
};

export const listUsers = async (req, res) => {
  const { name, email, address, role, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const where = {};
  if (name) where.name = { [Op.substring]: name };
  if (email) where.email = { [Op.substring]: email };
  if (address) where.address = { [Op.substring]: address };
  if (role) where.role = role;

  const result = await db.User.findAndCountAll({
    where,
    attributes: ['id','name','email','address','role','createdAt'],
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
    order: [[sortBy, sortOrder.toUpperCase()]]
  });

  res.json({ total: result.count, page: Number(page), pages: Math.ceil(result.count / limit), rows: result.rows });
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await db.User.findByPk(id, {
    attributes: ['id','name','email','address','role'],
    include: {
      model: db.Store, as: 'store', attributes: ['id','name','email','address']
    }
  });
  if (!user) return res.status(404).json({ message: 'User not found' });

  let rating = null;
  if (user.role === 'OWNER' && user.store) {
    const row = await db.Rating.findOne({
      attributes: [[fn('AVG', col('value')), 'avg']],
      where: { store_id: user.store.id },
      raw: true
    });
    rating = row?.avg ? Number(row.avg).toFixed(2) : null;
  }
  res.json({ ...user.toJSON(), ownerRating: rating });
};

export const createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  let owner = null;
  if (ownerId) {
    owner = await db.User.findByPk(ownerId);
    if (!owner) return res.status(400).json({ message: 'Owner not found' });
    if (owner.role !== 'OWNER') return res.status(400).json({ message: 'User is not an OWNER' });
    const existingOwned = await db.Store.findOne({ where: { owner_id: ownerId } });
    if (existingOwned) return res.status(400).json({ message: 'Owner already has a store' });
  }

  const store = await db.Store.create({ name, email, address, owner_id: ownerId || null });
  res.status(201).json(store);
};

export const listStores = async (req, res) => {
  const {
    name, email, address, page = 1, limit = 10,
    sortBy = 'createdAt', sortOrder = 'desc', q
  } = req.query;

  // Filtering
  const where = {};
  const filters = [];
  if (name) filters.push({ name: { [Op.substring]: name } });
  if (email) filters.push({ email: { [Op.substring]: email } });
  if (address) filters.push({ address: { [Op.substring]: address } });
  if (q) {
    filters.push({
      [Op.or]: [
        { name: { [Op.substring]: q } },
        { address: { [Op.substring]: q } }
      ]
    });
  }
  if (filters.length) Object.assign(where, { [Op.and]: filters });

  // Include average rating via subquery
  const rows = await db.Store.findAndCountAll({
    where,
    attributes: {
      include: [
        [literal(`(SELECT ROUND(AVG(value),2) FROM ratings r WHERE r.store_id = Store.id)`), 'rating']
      ]
    },
    include: [
      { model: db.User, as: 'owner', attributes: ['id','name','email'] }
    ],
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
    order: [[sortBy === 'rating' ? literal('rating') : sortBy, sortOrder.toUpperCase()]]
  });

  res.json({ total: rows.count, page: Number(page), pages: Math.ceil(rows.count / limit), rows: rows.rows });
};
