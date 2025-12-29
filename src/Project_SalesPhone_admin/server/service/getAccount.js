import {sequelize} from '../config/database.js';

async function getAccount_TruyVan () {
    try{
        const [rows] = await sequelize.query(
            `
                SELECT * from user_account
            `,
        );

        return rows;
    }   
    catch(err){
        console.error('DB query error: ', err);
        return[];
    }
};

export default getAccount_TruyVan;