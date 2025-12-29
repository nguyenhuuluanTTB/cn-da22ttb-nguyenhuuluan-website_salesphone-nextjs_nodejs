import express from 'express';
const router = express.Router();
import get_dashboard_stats_controller from '../controller/get_dashboard_stats_Controller.js';

router.get('/', get_dashboard_stats_controller);

export default router;
