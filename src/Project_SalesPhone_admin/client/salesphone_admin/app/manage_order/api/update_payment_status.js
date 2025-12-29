import axios from 'axios';

const API_URL = 'http://localhost:8000/order';

export default async function fetchUpdatePaymentStatus(id, payment_status) {
    try {
        const response = await axios.put(`${API_URL}/${id}/payment`, { payment_status });
        return response.data;
    } catch (error) {
        console.error('Error updating payment status:', error);
        throw error;
    }
}
