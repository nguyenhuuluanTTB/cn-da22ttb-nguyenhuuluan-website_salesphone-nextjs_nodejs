import update_payment_status from '../service/update_payment_status.js';

const update_payment_status_controller = async (req, res) => {
    try {
        const result = await update_payment_status(req.params.id, req.body.payment_status);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating payment status'
        });
    }
};

export default update_payment_status_controller;
