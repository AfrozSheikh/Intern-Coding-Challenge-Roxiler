import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Rating extends Model {}
  Rating.init(
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      value: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 1, max: 5 }
      }
     
    },
    {
      sequelize,
      modelName: 'Rating',
      tableName: 'ratings',
      indexes: [{ unique: true, fields: ['user_id', 'store_id'] }]
    }
  );
  return Rating;
};
