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
            const errorText = await res.text();
            console.error('Server response:', errorText);
            throw new Error('Server không phản hồi đúng. Vui lòng kiểm tra lại server backend.');
        }
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || 'Cập nhật số lượng thất bại');
        }
        
        return data;
    } catch (error) {
        console.error('Error in updateCartQuantity:', error);
        // Đảm bảo throw một Error object với message
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(error?.message || 'Không thể kết nối tới server');
    }
}
