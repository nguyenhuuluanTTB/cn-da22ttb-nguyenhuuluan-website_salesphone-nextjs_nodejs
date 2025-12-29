const GHN_TOKEN = '819c66e3-d8ca-11f0-913b-82522731f745';
const GHN_API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const GHN_SHOP_ID = null; // Điền Shop ID của bạn ở đây (lấy từ https://5sao.ghn.dev)

// Lấy danh sách tỉnh/thành phố
export const getProvinces = async () => {
    try {
        const res = await fetch(`${GHN_API_BASE}/province`, {
            method: 'GET',
            headers: {
                'Token': GHN_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (data.code === 200) {
            return data.data;
        }
        throw new Error(data.message || 'Không thể lấy danh sách tỉnh/thành');
    } catch (error) {
        console.error('Error fetching provinces:', error);
        throw error;
    }
};

// Lấy danh sách quận/huyện theo tỉnh
export const getDistricts = async (provinceId) => {
    try {
        const res = await fetch(`${GHN_API_BASE}/district`, {
            method: 'POST',
            headers: {
                'Token': GHN_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ province_id: provinceId })
        });
        const data = await res.json();
        if (data.code === 200) {
            return data.data;
        }
        throw new Error(data.message || 'Không thể lấy danh sách quận/huyện');
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};

// Lấy danh sách phường/xã theo quận
export const getWards = async (districtId) => {
    try {
        const res = await fetch(`${GHN_API_BASE}/ward`, {
            method: 'POST',
            headers: {
                'Token': GHN_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ district_id: districtId })
        });
        const data = await res.json();
        if (data.code === 200) {
            return data.data;
        }
        throw new Error(data.message || 'Không thể lấy danh sách phường/xã');
    } catch (error) {
        console.error('Error fetching wards:', error);
        throw error;
    }
};

// Tính phí vận chuyển
export const calculateShippingFee = async (toDistrictId, toWardCode, weight = 1000) => {
    try {
        // Nếu chưa có Shop ID, trả về phí cố định
        if (!GHN_SHOP_ID) {
            // Phí ship cố định: 30,000đ cho nội thành, 50,000đ cho ngoại thành
            return weight > 2000 ? 50000 : 30000;
        }

        const res = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
            method: 'POST',
            headers: {
                'Token': GHN_TOKEN,
                'ShopId': GHN_SHOP_ID.toString(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_type_id: 2, // Giao hàng tiêu chuẩn
                to_district_id: parseInt(toDistrictId),
                to_ward_code: toWardCode,
                weight: weight, // Khối lượng tính bằng gram
                insurance_value: 0,
                coupon: null
            })
        });
        const data = await res.json();
        if (data.code === 200) {
            return data.data.total; // Trả về tổng phí ship
        }
        // Nếu API lỗi, trả về phí cố định
        return weight > 2000 ? 50000 : 30000;
    } catch (error) {
        console.error('Error calculating shipping fee:', error);
        // Trả về phí cố định khi có lỗi
        return weight > 2000 ? 50000 : 30000;
    }
};
