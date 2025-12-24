const API_URL = 'http://localhost:5000/api';

const getPhone_Brand = async(token, brand) => {
    try{
        const res = await fetch(`${API_URL}/product/product_by_brand/${encodeURIComponent(brand)}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            console.error('API Error:', res.status, res.statusText);
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('API Response for brand', brand, ':', data);
        return data;
    }
    catch(err){
        console.error('Error fetching products by brand:', err);
        throw err;
    }
};
export default getPhone_Brand;