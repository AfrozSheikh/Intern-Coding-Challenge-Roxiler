import db from '../config/db.js';

export const createOrReplaceRating = async (req, res) => {
  const { storeId, value } = req.body;

  const store = await db.Store.findByPk(storeId);
  if (!store) return res.status(404).json({ message: 'Store not found' });

  const [rating, created] = await db.Rating.upsert(
    { user_id: req.user.id, store_id: storeId, value, id: undefined },
    { returning: true }
  );

  res.status(created ? 201 : 200).json({ message: created ? 'Rating created' : 'Rating updated', rating });
};

export const updateRating = async (req, res) => {
  const { value } = req.body;
  const { storeId } = req.params;

  const rating = await db.Rating.findOne({ where: { store_id: storeId, user_id: req.user.id } });
  if (!rating) return res.status(404).json({ message: 'No rating to update for this store' });

  rating.value = value;
  await rating.save();
  res.json({ message: 'Rating updated', rating });
};
