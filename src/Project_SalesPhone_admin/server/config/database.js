
import dotenv from 'dotenv';

dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connect MySQL successfully!');
    }
    catch(err){
        console.error('Kết nối MySQL thất bại: ', err);
    }
};

export {sequelize, connectDB};

