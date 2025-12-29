import get_order_detail from '../service/get_order_detail.js';

const get_order_detail_controller = async (req, res) => {
    try {
        const result = await get_order_detail(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while getting order detail'
        });
    }
};

export default get_order_detail_controller;
