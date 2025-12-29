const API_URL = 'http://localhost:5000';

const getSales50 = async (token) => {
    const res = await fetch(`${API_URL}/api/product/sales50`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    });

    const data = await res.json();
    return data;
};

export default getSales50;