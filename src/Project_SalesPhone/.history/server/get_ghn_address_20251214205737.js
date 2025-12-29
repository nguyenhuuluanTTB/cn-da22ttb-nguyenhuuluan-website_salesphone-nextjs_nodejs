// Script để lấy District ID và Ward Code từ GHN
const axios = require('axios');

const GHN_TOKEN = '819c66e3-d8ca-11f0-913b-82522731f745';
const API_URL = 'https://online-gateway.ghn.vn/shiip/public-api';

async function getProvinces() {
  const response = await axios.get(`${API_URL}/master-data/province`, {
    headers: { 'Token': GHN_TOKEN }
  });
  return response.data.data;
}

async function getDistricts(provinceId) {
  const response = await axios.post(
    `${API_URL}/master-data/district`,
    { province_id: provinceId },
    { headers: { 'Token': GHN_TOKEN } }
  );
  return response.data.data;
}

async function getWards(districtId) {
  const response = await axios.post(
    `${API_URL}/master-data/ward`,
    { district_id: districtId },
    { headers: { 'Token': GHN_TOKEN } }
  );
  return response.data.data;
}

async function main() {
  try {
    console.log('Đang tìm tỉnh Trà Vinh...');
    const provinces = await getProvinces();
    const traVinh = provinces.find(p => p.ProvinceName.includes('Trà Vinh'));
    
    if (!traVinh) {
      console.log('Không tìm thấy Trà Vinh');
      return;
    }
    
    console.log('✓ Tìm thấy:', traVinh.ProvinceName, '- ID:', traVinh.ProvinceID);
    
    console.log('\nĐang tìm huyện Càng Long...');
    const districts = await getDistricts(traVinh.ProvinceID);
    const cangLong = districts.find(d => d.DistrictName.includes('Càng Long'));
    
    if (!cangLong) {
      console.log('Không tìm thấy Càng Long');
      console.log('Danh sách huyện:', districts.map(d => d.DistrictName).join(', '));
      return;
    }
    
    console.log('✓ Tìm thấy:', cangLong.DistrictName, '- ID:', cangLong.DistrictID);
    
    console.log('\nĐang tìm phường/xã Nhị Long Phú...');
    const wards = await getWards(cangLong.DistrictID);
    const nhiLongPhu = wards.find(w => w.WardName.includes('Nhị Long Phú'));
    
    if (!nhiLongPhu) {
      console.log('Không tìm thấy Nhị Long Phú');
      console.log('Danh sách xã:', wards.map(w => w.WardName).join(', '));
      return;
    }
    
    console.log('✓ Tìm thấy:', nhiLongPhu.WardName, '- Code:', nhiLongPhu.WardCode);
    
    console.log('\n=================================');
    console.log('THÔNG TIN CẦN CẬP NHẬT:');
    console.log('=================================');
    console.log('GHN_FROM_DISTRICT_ID=' + cangLong.DistrictID);
    console.log('GHN_FROM_WARD_CODE=' + nhiLongPhu.WardCode);
    
  } catch (error) {
    console.error('Lỗi:', error.response?.data || error.message);
  }
}

main();
