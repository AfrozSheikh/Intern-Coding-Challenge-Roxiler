import { DataTypes, Model } from 'sequelize';

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  OWNER: 'OWNER'
};

export default (sequelize) => {
  class User extends Model {}
  User.init(
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(60), allowNull: false },
      email: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
      address: { type: DataTypes.STRING(400), allowNull: true },
      passwordHash: { type: DataTypes.STRING(200), allowNull: false },
      role: { type: DataTypes.ENUM(...Object.values(ROLES)), allowNull: false, defaultValue: ROLES.USER }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      indexes: [{ unique: true, fields: ['email'] }]
    }
  );
  return User;
};
