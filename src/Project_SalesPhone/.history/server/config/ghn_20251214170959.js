require('dotenv').config();

module.exports = {
  apiUrl: 'https://online-gateway.ghn.vn/shiip/public-api',
  token: process.env.GHN_TOKEN || '819c66e3-d8ca-11f0-913b-82522731f745',
  shopId: process.env.GHN_SHOP_ID || 6165531,
  webhookUrl: process.env.BACKEND_URL + '/api/order/ghn-webhook'
};
