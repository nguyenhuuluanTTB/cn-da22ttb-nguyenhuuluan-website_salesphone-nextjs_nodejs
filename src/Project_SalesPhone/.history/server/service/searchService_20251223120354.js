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
          i.image_url,
          j.percent AS percent
        FROM product p
        LEFT JOIN detail_product d ON p.id_product = d.id_product
        LEFT JOIN product_image i ON p.id_product = i.id_product
        LEFT JOIN promotion j ON p.id_promotion = j.id_promotion`;
        replacements.push(...arr);
      }
    };

    // Handle color by matching against actual values stored in detail_product.color
    if (filters.color) {

    // Discount / promotion filtering
    // onSale: boolean flag to indicate any discounted products
    if (filters.onSale) {
      where.push('j.percent > 0');
    }
    // discount: a single percent value -> match approximate range (±5%)
    if (filters.discount) {
      const d = Number(filters.discount);
      if (!Number.isNaN(d)) {
        const minD = Math.max(0, Math.round(d - 5));
        const maxD = Math.round(d + 5);
        where.push('j.percent BETWEEN ? AND ?');
        replacements.push(minD, maxD);
      }
    }
    if (filters.minDiscount) {
      const mn = Number(filters.minDiscount);
      if (!Number.isNaN(mn)) {
        where.push('j.percent >= ?');
        replacements.push(mn);
      }
    }
    if (filters.maxDiscount) {
      const mx = Number(filters.maxDiscount);
      if (!Number.isNaN(mx)) {
        where.push('j.percent <= ?');
        replacements.push(mx);
      }
    }
      const tokens = String(filters.color).split(',').map(v => v.trim()).filter(Boolean);
      if (tokens.length > 0) {
        // fetch distinct colors from DB
        const [dbColorRows] = await sequelize.query(`SELECT DISTINCT d.color AS color FROM detail_product d WHERE d.color IS NOT NULL AND d.color <> ''`);
        const dbColors = dbColorRows.map(r => r.color).filter(Boolean);

        const normalize = (s) => (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

        // Levenshtein distance
        const levenshtein = (a = '', b = '') => {
          const A = a.split('');
          const B = b.split('');
          const m = A.length;
          const n = B.length;
          if (m === 0) return n;
          if (n === 0) return m;
          const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
          for (let i = 0; i <= m; i++) dp[i][0] = i;
          for (let j = 0; j <= n; j++) dp[0][j] = j;
          for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
              const cost = A[i - 1] === B[j - 1] ? 0 : 1;
              dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            }
          }
          return dp[m][n];
        };

        const matched = new Set();
        for (const t of tokens) {
          const nt = normalize(t);
          // first try substring matches
          for (const dc of dbColors) {
            const nd = normalize(dc);
            if (!nd) continue;
            if (nd.includes(nt) || nt.includes(nd)) {
              matched.add(dc);
            }
          }
          // then fuzzy match via Levenshtein if no substring matches
          if (matched.size === 0) {
            let best = null;
            let bestScore = Infinity;
            for (const dc of dbColors) {
              const nd = normalize(dc);
              if (!nd) continue;
              const dist = levenshtein(nt, nd);
              const norm = dist / Math.max(nd.length, nt.length, 1);
              if (norm < bestScore) {
                bestScore = norm;
                best = dc;
              }
            }
            // accept if similarity is good (threshold 0.4)
            if (best !== null && bestScore <= 0.4) matched.add(best);
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
