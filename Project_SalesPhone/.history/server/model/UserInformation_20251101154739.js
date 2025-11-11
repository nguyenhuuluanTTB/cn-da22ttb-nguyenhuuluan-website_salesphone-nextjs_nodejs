const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // để setup quan hệ

const UserInformation = sequelize.define('UserInformation', {
  id_user_information: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // liên kết trực tiếp model User
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  fullname: {
    type: DataTypes.STRING(100),
    allowNull: true, // cho phép rỗng để user điền sau
  },
  phonenumber: {
    type: DataTypes.STRING(15),
    allowNull: true, // nên để allowNull true
  },
  gender: {
    type: DataTypes.ENUM('Nam', 'Nữ', 'Khác'),
    defaultValue: 'Khác',
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'user_information',
  timestamps: false,
});

// Thiết lập quan hệ
UserInformation.belongsTo(User, { foreignKey: 'id_user' });
User.hasOne(UserInformation, { foreignKey: 'id_user' });

module.exports = UserInformation;
