import Sequelize from '../config/database';

export async function getNewPhone () {
    try{
        const [rows] = await Sequelize.query(
            `SELECT phone_name AS name, phone_describe AS description, pricce, rate, discount
             FROM phones
             ORDER BY created_at ASC  -- ASC để lấy sản phẩm cũ nhất
             LIMIT 15`
        );
        return rows;
    }
    catch(err){
        console.error("DB query error: ", err);
        return [];
    }
}