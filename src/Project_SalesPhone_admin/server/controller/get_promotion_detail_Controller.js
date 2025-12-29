import get_promotion_detail from '../service/get_promotion_detail.js';

const get_promotion_detail_controller = async (req, res) => {
    try {
        const result = await get_promotion_detail(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while getting promotion detail'
        });
    }
};

export default get_promotion_detail_controller;
