import axios from 'axios';

const API_URL = 'http://localhost:8000/order';

export default async function fetchUpdateOrderStatus(id, status) {
    try {
        const response = await axios.put(`${API_URL}/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}
