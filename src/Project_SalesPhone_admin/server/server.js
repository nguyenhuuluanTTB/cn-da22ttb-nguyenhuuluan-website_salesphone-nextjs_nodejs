import express from 'express';
const port = 8000;
const app = express();
import { connectDB } from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import router_account from './route/accountRoute.js';
import router_product from './route/productRoute.js';
import router_promotion from './route/promotion.js';
import router_order from './route/orderRoute.js';
import router_stats from './route/statsRoute.js';

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/account',router_account);
app.use('/product',router_product);
app.use('/promotion', router_promotion);
app.use('/order', router_order);
app.use('/stats', router_stats);

app.listen(port, () => {
  console.log(`Salesphone_admin listening on port ${port}`)
})
