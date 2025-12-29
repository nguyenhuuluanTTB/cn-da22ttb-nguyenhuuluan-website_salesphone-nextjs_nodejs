import axios from 'axios';

const API_URL = 'http://localhost:8000/promotion';

export default async function fetchSoftDeletePromotion(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error soft deleting promotion:', error);
        throw error;
    }
}
