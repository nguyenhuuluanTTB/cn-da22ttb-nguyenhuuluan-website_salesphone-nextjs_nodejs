import Sequelize from '../config/database';

export async function getNewPhone () {
    try{
        const [rows] = await Sequelize.query(
            `SELECT phone_name AS name, phone_describe AS description, pricce, rate, discount
            FROM phones
            ORDER BY created_at DESC  -- hoặc id DESC nếu không có created_at
            LIMIT 15`
        );
        return rows;
    }
    catch(err){
        console.error("DB query error: ", err);
        return [];
    }
}