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
    // Giới hạn insurance_value cho môi trường test (max 5 triệu)
    const maxInsurance = 5000000;
    const insuranceValue = Math.min(actualCod, maxInsurance);
    
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
      insurance_value: insuranceValue, // Giới hạn tối đa 5 triệu
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
 * Format theo tài liệu GHN:
 * - Type: create, switch_status, update_weight, update_cod, update_fee
 * - Status: ready_to_pick, picking, picked, storing, transporting, sorting, delivering, delivered, return, returned, cancel
 */
exports.updateOrderStatusFromGHN = async (webhookData) => {
  try {
    const { 
      OrderCode,        // Mã vận đơn GHN (ví dụ: "Z82BS")
      Status,           // Trạng thái: delivered, cancel, return, etc
      ClientOrderCode,  // Mã đơn hàng của shop
      Type,             // Loại sự kiện: create, switch_status, etc
      CODAmount,        // Tiền thu hộ
      TotalFee,         // Tổng phí dịch vụ
      Description,      // Mô tả
      Reason            // Lý do (nếu có)
    } = webhookData;

    console.log('Processing GHN webhook:', {
      OrderCode,
      Status,
      Type,
      ClientOrderCode,
      Description
    });

    // Map trạng thái GHN sang trạng thái hệ thống
    let orderStatus = 'pending';
    let paymentStatus = 'pending';

    switch (Status?.toLowerCase()) {
      case 'ready_to_pick':
        orderStatus = 'confirmed';
        paymentStatus = 'pending';
        break;
      case 'picking':
        orderStatus = 'processing';
        paymentStatus = 'pending';
        break;
      case 'picked':
      case 'storing':
      case 'transporting':
      case 'sorting':
        orderStatus = 'shipping';
        paymentStatus = 'pending';
        break;
      case 'delivering':
        orderStatus = 'shipping';
        paymentStatus = 'pending';
        break;
      case 'delivered':
        orderStatus = 'completed';
        paymentStatus = 'paid'; // Đã giao hàng = đã thanh toán
        break;
      case 'return':
      case 'returned':
        orderStatus = 'cancelled';
        paymentStatus = 'refunded';
        break;
      case 'cancel':
        orderStatus = 'cancelled';
        paymentStatus = 'cancelled';
        break;
      case 'delivery_fail':
        orderStatus = 'failed';
        paymentStatus = 'pending';
        break;
      default:
        console.warn('Unknown GHN status:', Status);
        orderStatus = 'pending';
    }

    // ĐẢM BẢO: Nếu đơn hàng completed thì luôn là paid
    if (orderStatus === 'completed') {
      paymentStatus = 'paid';
    }

    return {
      orderId: ClientOrderCode,
      ghnOrderCode: OrderCode,
      status: orderStatus,
      paymentStatus: paymentStatus,
      ghnStatus: Status,
      webhookType: Type,
      description: Description,
      reason: Reason,
      codAmount: CODAmount,
      totalFee: TotalFee
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

/**
 * Tạo token để in thông tin đơn hàng
 * Token có hiệu lực 30 phút
 */
exports.generatePrintToken = async (orderCodes) => {
  try {
    if (!Array.isArray(orderCodes) || orderCodes.length === 0) {
      return {
        success: false,
        message: 'Danh sách mã đơn hàng không hợp lệ'
      };
    }

    const response = await axios.post(
      `${ghnConfig.apiUrl}/v2/a5/gen-token`,
      { order_codes: orderCodes },
      {
        headers: {
          'Token': ghnConfig.token,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.code === 200) {
      const token = response.data.data.token;
      
      // Tạo các URL in theo format khác nhau
      const baseUrl = ghnConfig.apiUrl.replace('/shiip/public-api', '');
      
      return {
        success: true,
        data: {
          token: token,
          printUrls: {
            a5: `${baseUrl}/a5/public-api/printA5?token=${token}`,
            print80x80: `${baseUrl}/a5/public-api/print80x80?token=${token}`,
            print52x70: `${baseUrl}/a5/public-api/print52x70?token=${token}`
          },
          expiresIn: '30 phút'
        }
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Không thể tạo token in đơn hàng'
      };
    }
  } catch (error) {
    console.error('Generate print token error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};
