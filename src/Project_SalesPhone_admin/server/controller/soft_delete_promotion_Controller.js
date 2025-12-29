import soft_delete_promotion from '../service/soft_delete_promotion.js';

const soft_delete_promotion_controller = async (req, res) => {
    try {
        const result = await soft_delete_promotion(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while deleting promotion'
        });
    }
};

export default soft_delete_promotion_controller;
