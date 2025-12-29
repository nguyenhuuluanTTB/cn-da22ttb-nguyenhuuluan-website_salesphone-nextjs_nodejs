import axios from 'axios';

const API_URL = 'http://localhost:8000/promotion';

export default async function fetchUpdatePromotion(id, data) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating promotion:', error);
        throw error;
    }
}
