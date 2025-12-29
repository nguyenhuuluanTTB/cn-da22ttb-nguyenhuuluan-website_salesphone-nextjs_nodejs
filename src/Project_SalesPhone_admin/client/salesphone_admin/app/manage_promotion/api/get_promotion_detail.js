import axios from 'axios';

const API_URL = 'http://localhost:8000/promotion';

export default async function fetchPromotionDetail(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotion detail:', error);
        throw error;
    }
}
