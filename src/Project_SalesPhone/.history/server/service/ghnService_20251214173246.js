const ghnConfig = require('../config/ghn');
const axios = require('axios');

/**
 * Tạo đơn hàng trên Giao Hàng Nhanh
 */
exports.createGHNOrder = async (orderData) => {
  try {
    const {
      orderId,
      receiverName,
      receiverPhone,
      receiverAddress,
      provinceId,
      districtId,
      wardCode,
      items,
      codAmount,
      shippingFee,
      note
    } = orderData;

    // Môi trường dev không giới hạn COD nghiêm ngặt
    const actualCod = parseInt(codAmount) || 0;
    
    const payload = {
      payment_type_id: codAmount > 0 ? 2 : 1,
      note: note || `Đơn hàng ${orderId}`,
      required_note: "KHONGCHOXEMHANG",
      client_order_code: orderId,
      // Không gửi from_* để GHN tự động lấy từ địa chỉ mặc định trong shop
      to_name: receiverName,
      to_phone: receiverPhone,
      to_address: receiverAddress,
      to_ward_code: wardCode,
      to_district_id: parseInt(districtId),
      cod_amount: actualCod, // Giới hạn COD
      content: "Điện thoại di động",
      weight: 500,
      length: 20,
      width: 15,
      height: 10,
      insurance_value: actualCod,
      service_type_id: 2,
      items: items.map(item => ({
        name: item.name || "Điện thoại",
        code: item.code || item.id_product.toString(),
        quantity: item.quantity,
        price: parseInt(item.price)
      }))
    };

    const response = await axios.post(
      `${ghnConfig.apiUrl}/v2/shipping-order/create`,
      payload,
      {
        headers: {
          'Token': ghnConfig.token,
          'ShopId': ghnConfig.shopId,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.code === 200) {
      return {
        success: true,
        data: response.data.data // { order_code, expected_delivery_time, etc }
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Không thể tạo đơn trên GHN'
      };
    }
  } catch (error) {
    console.error('GHN create order error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};

/**
 * Cập nhật trạng thái đơn hàng từ GHN webhook
 */
exports.updateOrderStatusFromGHN = async (webhookData) => {
  try {
    const { 
      OrderCode,      // Mã vận đơn GHN
      Status,         // Trạng thái: delivered, cancel, return, etc
      ClientOrderCode // Mã đơn hàng của shop
    } = webhookData;

    // Map trạng thái GHN sang trạng thái hệ thống
    let orderStatus = 'pending';
    let paymentStatus = 'pending';

    switch (Status) {
      case 'ready_to_pick':
        orderStatus = 'confirmed';
        break;
      case 'picking':
        orderStatus = 'processing';
        break;
      case 'picked':
      case 'storing':
      case 'transporting':
        orderStatus = 'shipping';
        break;
      case 'delivered':
        orderStatus = 'completed';
        paymentStatus = 'paid'; // COD đã thanh toán
        break;
      case 'cancel':
      case 'return':
        orderStatus = 'cancelled';
        break;
      case 'delivery_fail':
        orderStatus = 'failed';
        break;
    }

    return {
      orderId: ClientOrderCode,
      ghnOrderCode: OrderCode,
      status: orderStatus,
      paymentStatus: paymentStatus,
      ghnStatus: Status
    };
  } catch (error) {
    console.error('Update order status from GHN error:', error);
    throw error;
  }
};

/**
 * Lấy thông tin đơn hàng từ GHN
 */
exports.getGHNOrderInfo = async (orderCode) => {
  try {
    const response = await axios.post(
      `${ghnConfig.apiUrl}/v2/shipping-order/detail`,
      { order_code: orderCode },
      {
        headers: {
          'Token': ghnConfig.token,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.code === 200) {
      return {
        success: true,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Không thể lấy thông tin đơn hàng'
      };
    }
  } catch (error) {
    console.error('Get GHN order info error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};
