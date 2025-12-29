import update_order_status from '../service/update_order_status.js';

const update_order_status_controller = async (req, res) => {
    try {
        const result = await update_order_status(req.params.id, req.body.status);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating order status'
        });
    }
};

export default update_order_status_controller;
