import { sequelize } from '../config/database.js';


async function get_promotion_truyvan(){
    try{
        const [rows] = await sequelize.query(
            `
                select * from promotion
            `,
        );

        return {
            success: true,
            data: rows
        }
    }
    catch(err){
        console.error('Error while geting data from query: ',err);
        throw err;
    }
}

export default get_promotion_truyvan;