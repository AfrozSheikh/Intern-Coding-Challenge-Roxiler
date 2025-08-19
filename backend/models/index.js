import User from './User.js';
import Store from './Store.js';
import Rating from './Rating.js';

export default (sequelize) => {
  const UserModel = User(sequelize);
  const StoreModel = Store(sequelize);
  const RatingModel = Rating(sequelize);

 
  UserModel.hasOne(StoreModel, { foreignKey: { name: 'owner_id', allowNull: true }, as: 'store' });
  StoreModel.belongsTo(UserModel, { foreignKey: 'owner_id', as: 'owner' });

  UserModel.hasMany(RatingModel, { foreignKey: { name: 'user_id', allowNull: false }, as: 'ratings' });
  RatingModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

  StoreModel.hasMany(RatingModel, { foreignKey: { name: 'store_id', allowNull: false }, as: 'ratings' });
  RatingModel.belongsTo(StoreModel, { foreignKey: 'store_id', as: 'store' });

  return {
    User: UserModel,
    Store: StoreModel,
    Rating: RatingModel,
    sequelize
  };
};
