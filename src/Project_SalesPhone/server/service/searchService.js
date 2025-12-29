const { sequelize } = require('../config/database');

module.exports.searchProducts = async function (filters) {
  try {
    const where = [];
    const replacements = [];

    // Token-based text search across multiple fields
    if (filters.q) {
      // Split query into tokens (words) - keep original form with accents
      const tokens = filters.q
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      if (tokens.length > 0) {
        // For each token, create a condition that checks if it appears in ANY of the searchable fields
        const tokenConditions = tokens.map(() => {
          return `(
            LOWER(p.name_product) LIKE ? 
            OR LOWER(p.brand) LIKE ?
            OR LOWER(d.description_phone) LIKE ?
            OR LOWER(REPLACE(d.ram, ' ', '')) LIKE ?
            OR LOWER(REPLACE(d.rom, ' ', '')) LIKE ?
            OR LOWER(d.color) LIKE ?
          )`;
        });

        // Any token can match (OR logic) - more flexible search
        where.push('(' + tokenConditions.join(' OR ') + ')');

        // Add replacements for each token across all fields
        tokens.forEach(token => {
          const lowerToken = token.toLowerCase();
          const noSpaceToken = lowerToken.replace(/\s+/g, '');
          // For most fields, use original token
          // For RAM/ROM, use token without spaces to match "256GB" with "256 GB"
          replacements.push(
            `%${lowerToken}%`,  // name_product
            `%${lowerToken}%`,  // brand
            `%${lowerToken}%`,  // description_phone
            `%${noSpaceToken}%`, // ram (no space)
            `%${noSpaceToken}%`, // rom (no space)
            `%${lowerToken}%`   // color
          );
        });
      }
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
    // RAM filter - handle space variations
    if (filters.ram) {
      const ramValues = String(filters.ram).split(',').map(v => v.trim().replace(/\s+/g, '')).filter(Boolean);
      if (ramValues.length > 0) {
        const conditions = ramValues.map(() => `REPLACE(LOWER(d.ram), ' ', '') = ?`);
        where.push(`(${conditions.join(' OR ')})`);
        replacements.push(...ramValues.map(v => v.toLowerCase()));
      }
    }

    // ROM filter - handle space variations
    if (filters.rom) {
      const romValues = String(filters.rom).split(',').map(v => v.trim().replace(/\s+/g, '')).filter(Boolean);
      if (romValues.length > 0) {
        const conditions = romValues.map(() => `REPLACE(LOWER(d.rom), ' ', '') = ?`);
        where.push(`(${conditions.join(' OR ')})`);
        replacements.push(...romValues.map(v => v.toLowerCase()));
      }
    }

    // brand
    handleIn('p.brand', filters.brand);

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

    let query = `SELECT 
          p.id_product,
          p.name_product,
          p.price,
          p.product_code,
          p.brand,
          p.rate,
          p.quantity,
          p.status,
          d.description_phone,
          d.color,
          d.ram,
          d.rom,
          d.battery,
          d.cpu_detail,
          d.operating_system,
          d.screen_size,
          d.warranty,
          d.front_camera,
          d.rear_camera,
          d.chip_nfc,
          d.resolution,
          d.screen_frequency,
          i.image_url,
          j.percent AS percent
        FROM product p
        LEFT JOIN detail_product d ON p.id_product = d.id_product
        LEFT JOIN product_image i ON p.id_product = i.id_product
        LEFT JOIN promotion j ON p.id_promotion = j.id_promotion`;

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
