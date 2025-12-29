import express from 'express';
const router = express.Router();
import getProduct from '../controller/getProduct_Controller.js';
import view_info_product from '../controller/viewdt_product_Controller.js';
import addProduct from '../controller/add_product_Controller.js'
import update_product from '../controller/update_product_Controller.js';
import delete_product from '../controller/soft_del_product_Controller.js';

router.get('/',getProduct);
router.post('/view_detail', view_info_product);
router.post('/add', addProduct);
router.post('/update', update_product);
router.post('/delete', delete_product);

export default router;