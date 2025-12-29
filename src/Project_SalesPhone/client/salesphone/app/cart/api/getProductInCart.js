const API_BASE_URL = 'http://localhost:5000/api';

export const getProduct = async (token) => {
    const res = await fetch(`${API_BASE_URL}/cart/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
    });
    const data = await res.json();
    console.log(res.status);
    return data;
}