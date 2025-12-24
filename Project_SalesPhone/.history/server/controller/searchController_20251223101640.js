const { searchProducts } = require('../service/searchService');

exports.searchProducts = async (req, res) => {
  const q = req.query.q || req.query.q || '';
  if (!q) return res.json({ success: true, data: [] });
  try {
    const rows = await searchProducts(q);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('searchController error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
