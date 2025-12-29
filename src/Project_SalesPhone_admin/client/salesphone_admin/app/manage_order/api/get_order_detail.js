import axios from 'axios';

const API_URL = 'http://localhost:8000/order';

export default async function fetchOrderDetail(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order detail:', error);
        throw error;
    }
}
