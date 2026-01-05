const getNewPhone_TruyVan = require('../service/productService');

const getNewPhone = async (req, res) => {
    try {
        const phones = await getNewPhone_TruyVan();
        res.json({ success: true, data: phones });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getNewPhone };