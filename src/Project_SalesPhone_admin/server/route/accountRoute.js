import express from 'express';
const router = express.Router();
import getAccount from '../controller/getAccount_Controller.js';
import unable_account from '../controller/unableAccount_Controller.js';
import enable_account from '../controller/enableAccount_Controller.js';
import getUserInformation_Controller from '../controller/getUserInformation_Controller.js';
import loginController from '../controller/login_Controller.js';

router.post('/login', loginController);
router.get('/', getAccount);
router.post('/unable', unable_account);
router.post('/enable', enable_account);
router.get('/info/:id', getUserInformation_Controller);

export default router;