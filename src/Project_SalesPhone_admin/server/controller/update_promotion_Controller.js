import update_promotion from '../service/update_promotion.js';

const update_promotion_controller = async (req, res) => {
    try {
        const result = await update_promotion(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating promotion'
        });
    }
};

export default update_promotion_controller;
