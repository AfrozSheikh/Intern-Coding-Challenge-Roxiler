import db from '../config/db.js';
import { Op, literal } from 'sequelize';

export const listStoresForUser = async (req, res) => {
  const { q, name, address, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const filters = [];
  if (q) filters.push({ [Op.or]: [{ name: { [Op.substring]: q } }, { address: { [Op.substring]: q } }] });
  if (name) filters.push({ name: { [Op.substring]: name } });
  if (address) filters.push({ address: { [Op.substring]: address } });

  const where = filters.length ? { [Op.and]: filters } : {};

  const rows = await db.Store.findAndCountAll({
    where,
    attributes: {
      include: [
        [literal(`(SELECT ROUND(AVG(value),2) FROM ratings r WHERE r.store_id = Store.id)`), 'overallRating'],
        [literal(`(SELECT value FROM ratings r WHERE r.store_id = Store.id AND r.user_id = ${req.user.id} LIMIT 1)`), 'myRating']
      ]
    },
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
    order: [[sortBy === 'overallRating' ? literal('overallRating') : sortBy, sortOrder.toUpperCase()]]
  });

  res.json({ total: rows.count, page: Number(page), pages: Math.ceil(rows.count / limit), rows: rows.rows });
};

export const ownerDashboard = async (req, res) => {
  const store = await db.Store.findOne({ where: { owner_id: req.user.id } });
  if (!store) return res.status(404).json({ message: 'No store assigned to this owner' });

  const ratings = await db.Rating.findAll({
    where: { store_id: store.id },
    include: [{ model: db.User, as: 'user', attributes: ['id','name','email','address'] }],
    order: [['createdAt','DESC']]
  });

  const avg = await db.Rating.findOne({
    where: { store_id: store.id },
    attributes: [[db.sequelize.fn('ROUND', db.sequelize.fn('AVG', db.sequelize.col('value')), 2), 'average']],
    raw: true
  });

  res.json({
    store: { id: store.id, name: store.name, email: store.email, address: store.address },
    averageRating: avg?.average ?? null,
    raters: ratings.map(r => ({ id: r.user.id, name: r.user.name, email: r.user.email, address: r.user.address, rating: r.value }))
  });
};
