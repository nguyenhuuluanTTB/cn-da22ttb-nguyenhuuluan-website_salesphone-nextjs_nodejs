import express from 'express';
const router = express.Router();
import getAccount from '../controller/getAccount_Controller.js';
import unable_account from '../controller/unableAccount_Controller.js';
import enable_account from '../controller/enableAccount_Controller.js';

router.get('/', getAccount);
router.post('/unable', unable_account);
router.post('/enable', enable_account);

export default router;