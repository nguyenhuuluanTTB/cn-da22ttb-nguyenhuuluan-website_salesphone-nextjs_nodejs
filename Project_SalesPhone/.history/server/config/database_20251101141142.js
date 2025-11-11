const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD || '', // nếu undefined thì dùng ''
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
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
