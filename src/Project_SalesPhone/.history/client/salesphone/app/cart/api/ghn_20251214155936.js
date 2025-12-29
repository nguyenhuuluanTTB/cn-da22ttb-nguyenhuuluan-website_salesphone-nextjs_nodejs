const GHN_TOKEN = '819c66e3-d8ca-11f0-913b-82522731f745';
const GHN_API_BASE = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const GHN_SHOP_ID = 5437165; // Shop ID mặc định của GHN

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
