const API_BASE_URL = 'http://localhost:5000/api';

export const updateCartQuantity = async (token, id_product, quantity) => {
    const res = await fetch(`${API_BASE_URL}/cart/update-quantity`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ id_product, quantity })
    });
    const data = await res.json();
    
    if (!res.ok) {
        throw data;
    }
    
    return data;
}
