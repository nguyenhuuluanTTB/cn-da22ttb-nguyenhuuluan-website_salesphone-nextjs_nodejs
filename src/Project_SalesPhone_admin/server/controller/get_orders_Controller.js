import get_all_orders from '../service/get_orders.js';

const get_orders_controller = async (req, res) => {
    try {
        const result = await get_all_orders();
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while getting orders'
        });
    }
};

export default get_orders_controller;
