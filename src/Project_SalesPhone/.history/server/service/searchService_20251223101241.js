const { sequelize } = require('../config/database');

module.exports.searchProducts = async function (q) {
  try {
    const like = `%${q}%`;
    const [rows] = await sequelize.query(
      `SELECT 
          p.id_product,
          p.name_product,
          p.price,
          p.product_code,
          p.brand,
          p.rate,
          d.description_phone,
          i.image_url
        FROM product p
        LEFT JOIN detail_product d ON p.id_product = d.id_product
        LEFT JOIN product_image i ON p.id_product = i.id_product
        WHERE p.name_product LIKE ? OR p.brand LIKE ? OR d.description_phone LIKE ?
        GROUP BY p.id_product
        LIMIT 10;`,
      { replacements: [like, like, like] }
    );
    return rows;
  } catch (err) {
    console.error('searchProducts error:', err);
    return [];
  }
};
