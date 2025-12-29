import axios from 'axios';

const API_URL = 'http://localhost:8000/promotion';

export default async function fetchGetPromotion() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotions:', error);
        throw error;
    }
}
