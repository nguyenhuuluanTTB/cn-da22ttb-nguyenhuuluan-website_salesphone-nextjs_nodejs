const { searchProducts } = require('../service/searchService');

exports.searchProducts = async (req, res) => {
  // Accept various search params: q (text), minPrice, maxPrice, color, ram, rom, brand
  const { q = '', minPrice, maxPrice, color, ram, rom, brand } = req.query;

  // If no filters provided, return empty to avoid full table scan
  if (!q && !minPrice && !maxPrice && !color && !ram && !rom && !brand) {
    return res.json({ success: true, data: [] });
  }

  try {
    const filters = { q, minPrice, maxPrice, color, ram, rom, brand };
    const rows = await searchProducts(filters);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('searchController error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
