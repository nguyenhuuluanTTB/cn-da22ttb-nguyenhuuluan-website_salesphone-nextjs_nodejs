const {sequelize} = require('../config/database');

module.exports = async function getOneProduct_TruyVan(){
    try{
        const [rows] = await sequelize.query(
            `SELECT 
                p.id_product,
                p.name_product,
                p.price,
                p.type,
                p.brand,
                p.quantity,
                p.status,
                p.id_promotion,
                p.product_code,
                p.rate,
                d.color,
                d.rom,
                d.ram,
                d.screen_size,
                d.battery,
                d.description_phone,
                d.warranty,
                d.front_camera,
                d.rear_camera,
                d.cpu_detail,
                d.operating_system,
                d.chip_nfc,
                d.resolution,
                d.screen_frequency,
                d.video,
                i.image_url,
                j.start_at,
                j.end_at,
                j.percent,
                j.name_promotion,
                j.describe_promotion

            FROM product AS p
            LEFT JOIN detail_product AS d ON p.id_product = d.id_product
            LEFT JOIN product_image AS i ON p.id_product = i.id_product
            LEFT JOIN promotion AS j ON p.id_promotion = j.id_promotion

            WHERE 

            `
        )
    }
    catch(err){

    }
}