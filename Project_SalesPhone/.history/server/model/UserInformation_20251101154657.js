const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

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
        model: "Users", // tên bảng User
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  fullname: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phonenumber: {
    type: DataTypes.STRING(15),
  },
  gender: {
    type: DataTypes.ENUM('Nam', 'Nữ', 'Khác'),
    defaultValue: 'Khác',
  },
  address: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'user_information', // Sử dụng bảng đã tạo sẵn
  timestamps: false,
});

module.exports = UserInformation;