const getAllPromotions = require('../service/promotionService');

exports.getPromotions = async (req, res) => {
    try {
        const promotions = await getAllPromotions();
        res.json({ success: true, data: promotions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
