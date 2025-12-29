import get_dashboard_stats from '../service/get_dashboard_stats.js';

const get_dashboard_stats_controller = async (req, res) => {
    try {
        const result = await get_dashboard_stats();
        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while getting dashboard stats'
        });
    }
};

export default get_dashboard_stats_controller;
