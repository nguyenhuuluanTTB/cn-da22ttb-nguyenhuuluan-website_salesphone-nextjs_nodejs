import express from 'express';
const router = express.Router();
import get_orders_controller from '../controller/get_orders_Controller.js';
import get_order_detail_controller from '../controller/get_order_detail_Controller.js';
import update_order_status_controller from '../controller/update_order_status_Controller.js';
import update_payment_status_controller from '../controller/update_payment_status_Controller.js';

router.get('/', get_orders_controller);
router.get('/:id', get_order_detail_controller);
router.put('/:id/status', update_order_status_controller);
router.put('/:id/payment', update_payment_status_controller);

export default router;
