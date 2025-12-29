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

    // Handle color by matching against actual values stored in detail_product.color
    if (filters.color) {
      const tokens = String(filters.color).split(',').map(v => v.trim()).filter(Boolean);
      if (tokens.length > 0) {
        // fetch distinct colors from DB
        const [dbColorRows] = await sequelize.query(`SELECT DISTINCT d.color AS color FROM detail_product d WHERE d.color IS NOT NULL AND d.color <> ''`);
        const dbColors = dbColorRows.map(r => r.color).filter(Boolean);

        const normalize = (s) => (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

        const matched = new Set();
        for (const t of tokens) {
          const nt = normalize(t);
          for (const dc of dbColors) {
            const nd = normalize(dc);
            if (!nd) continue;
            if (nd.includes(nt) || nt.includes(nd)) {
              matched.add(dc);
            }
          }
        }

        if (matched.size > 0) {
          const arr = Array.from(matched);
          if (arr.length === 1) {
            where.push('d.color = ?');
            replacements.push(arr[0]);
          } else {
            const ph = arr.map(() => '?').join(',');
            where.push(`d.color IN (${ph})`);
            replacements.push(...arr);
          }
        } else {
          // fallback: do LIKE match against provided tokens
          const likeClauses = tokens.map(() => 'd.color LIKE ?').join(' OR ');
          where.push(`(${likeClauses})`);
          tokens.forEach(t => replacements.push(`%${t}%`));
        }
      }
    }
    handleIn('d.ram', filters.ram);
    handleIn('d.rom', filters.rom);
    if (filters.brand) {
      where.push('p.brand LIKE ?');
      replacements.push(`%${filters.brand}%`);
    }

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
