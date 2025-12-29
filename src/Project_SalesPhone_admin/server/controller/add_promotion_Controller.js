import add_promotion from '../service/add_promotion.js';

const add_promotion_controller = async (req, res) => {
    try {
        const result = await add_promotion(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while adding promotion'
        });
    }
};

export default add_promotion_controller;
