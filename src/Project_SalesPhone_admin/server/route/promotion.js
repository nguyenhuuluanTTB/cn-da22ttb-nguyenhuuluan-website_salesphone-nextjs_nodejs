import express from 'express';
const router = express.Router();
import get_promotion from '../controller/get_promotion_Controller.js';
import get_promotion_detail_controller from '../controller/get_promotion_detail_Controller.js';
import add_promotion_controller from '../controller/add_promotion_Controller.js';
import update_promotion_controller from '../controller/update_promotion_Controller.js';
import soft_delete_promotion_controller from '../controller/soft_delete_promotion_Controller.js';

router.get('/', get_promotion);
router.get('/:id', get_promotion_detail_controller);
router.post('/', add_promotion_controller);
router.put('/:id', update_promotion_controller);
router.delete('/:id', soft_delete_promotion_controller);

export default router;