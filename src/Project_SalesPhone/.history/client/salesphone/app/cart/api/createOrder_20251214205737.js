const API_BASE_URL = 'http://localhost:5000/api';

export const createOrder = async (token, orderData) => {
    const res = await fetch(`${API_BASE_URL}/order/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(orderData)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.message || 'Không thể tạo đơn hàng');
    }
    
    return data;
}
