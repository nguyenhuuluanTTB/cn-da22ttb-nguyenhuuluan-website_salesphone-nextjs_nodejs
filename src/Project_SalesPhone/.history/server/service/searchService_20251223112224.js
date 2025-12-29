const { sequelize } = require('../config/database');

module.exports.searchProducts = async function (filters) {
  try {
    const where = [];
    const replacements = [];

    // text search across name, brand, description
    if (filters.q) {
      const like = `%${filters.q}%`;
      where.push('(p.name_product LIKE ? OR p.brand LIKE ? OR d.description_phone LIKE ?)');
      replacements.push(like, like, like);
    }

    // brand explicit filter
    if (filters.brand) {
      where.push('p.brand LIKE ?');
      replacements.push(`%${filters.brand}%`);
    }

    // price range
    if (filters.minPrice) {
      const min = Number(filters.minPrice);
      if (!Number.isNaN(min)) {
        where.push('p.price >= ?');
        replacements.push(min);
      }
    }
    if (filters.maxPrice) {
      const max = Number(filters.maxPrice);
      if (!Number.isNaN(max)) {
        where.push('p.price <= ?');
        replacements.push(max);
      }
    }

    // helper for comma-separated IN or single value
    const handleIn = (field, value) => {
      if (!value) return;
      const arr = String(value).split(',').map(v => v.trim()).filter(Boolean);
      if (arr.length === 0) return;
      if (arr.length === 1) {
        where.push(`${field} = ?`);
        replacements.push(arr[0]);
      } else {
        const ph = arr.map(() => '?').join(',');
        where.push(`${field} IN (${ph})`);
        replacements.push(...arr);
      }
    };

    // color, ram, rom filters stored in detail_product
    handleIn('d.color', filters.color);
    handleIn('d.ram', filters.ram);
    handleIn('d.rom', filters.rom);

    // Build base query
    let query = `SELECT 
          p.id_product,
          p.name_product,
          p.price,
          p.product_code,
          p.brand,
          p.rate,
          d.description_phone,
          d.color,
          d.ram,
          d.rom,
          i.image_url
        FROM product p
        LEFT JOIN detail_product d ON p.id_product = d.id_product
        LEFT JOIN product_image i ON p.id_product = i.id_product`;

    if (where.length > 0) {
      query += '\n        WHERE ' + where.join(' AND ');
    }

    query += '\n        GROUP BY p.id_product\n        ORDER BY p.rate DESC\n        LIMIT 20;';

    const [rows] = await sequelize.query(query, { replacements });
    return rows;
  } catch (err) {
    console.error('searchProducts error:', err);
    return [];
  }
};
