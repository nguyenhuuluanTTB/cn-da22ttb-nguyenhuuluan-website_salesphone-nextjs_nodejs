const API_BASE_URL = 'http://localhost:5000/api';

export const updateCartQuantity = async (token, id_product, quantity) => {
    try {
        const res = await fetch(`${API_BASE_URL}/cart/update-quantity`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ id_product, quantity })
        });
        
        // Kiểm tra content-type trước khi parse JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server không phản hồi đúng định dạng JSON. Vui lòng kiểm tra lại server.');
        }
        
        const data = await res.json();
        
        if (!res.ok) {
            throw data;
        }
        
        return data;
    } catch (error) {
        console.error('Error in updateCartQuantity:', error);
        throw error;
    }
}
