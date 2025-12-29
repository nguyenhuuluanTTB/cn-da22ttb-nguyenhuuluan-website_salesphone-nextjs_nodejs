const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false, // Tắt log SQL nếu không cần
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối MySQL thành công');
  } catch (err) {
    console.error('Kết nối MySQL thất bại:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };