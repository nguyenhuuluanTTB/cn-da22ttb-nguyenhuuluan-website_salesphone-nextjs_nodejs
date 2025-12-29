import {sequelize} from '../config/database.js';

async function getProduct_TruyVan () {
    try{
        const [rows] = await sequelize.query(
            `
                select 
                    i.id_product,
                    i.name_product,
                    i.price,
                    i.brand,
                    i.quantity,
                    i.status,
                    j.name_promotion,
                    i.rate,
                    i.is_del_phone
                from product as i
                left join promotion as j  on i.id_promotion = j.id_promotion
            `,
        );

        return rows;
    }
    catch(err){
        console.error('DB query error: ',err);
    }
}

export default getProduct_TruyVan;