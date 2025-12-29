const { searchProducts } = require('../service/searchService');

exports.searchProducts = async (req, res) => {
  // Accept various search params: q (text), minPrice, maxPrice, color, ram, rom, brand, discount filters
  const { q = '', minPrice, maxPrice, color, ram, rom, brand, discount, minDiscount, maxDiscount, onSale } = req.query;

  // If no filters provided, return empty to avoid full table scan
  if (!q && !minPrice && !maxPrice && !color && !ram && !rom && !brand && !discount && !minDiscount && !maxDiscount && !onSale) {
    return res.json({ success: true, data: [] });
  }

  try {
    const filters = { q, minPrice, maxPrice, color, ram, rom, brand, discount, minDiscount, maxDiscount, onSale };
    const rows = await searchProducts(filters);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('searchController error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
