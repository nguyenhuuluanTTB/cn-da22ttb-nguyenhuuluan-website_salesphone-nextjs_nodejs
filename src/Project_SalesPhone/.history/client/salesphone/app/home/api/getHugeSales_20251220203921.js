const API_URL = 'http://localhost:5000';

const getHugeSales = async (token) => {
    const res = await fetch(`${API_URL}/api/product/hugesales`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    return data;
}

export default getHugeSales;