const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB,        // database name
  process.env.MYSQL_USER,      // user
  process.env.MYSQL_PASSWORD,  // password (empty string nếu không có)
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false, // tắt log SQL nếu muốn
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối MySQL thành công');
  } catch (error) {
    console.error('Kết nối MySQL thất bại:', error.message);
  }
};

module.exports = { sequelize, connectDB };
