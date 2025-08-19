import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Store extends Model {}
  Store.init(
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false },
      email: { type: DataTypes.STRING(120), allowNull: true, validate: { isEmail: true } },
      address: { type: DataTypes.STRING(400), allowNull: false }
     
    },
    {
      sequelize,
      modelName: 'Store',
      tableName: 'stores'
    }
  );
  return Store;
};
