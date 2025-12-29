import axios from 'axios';

const API_URL = 'http://localhost:8000/promotion';

export default async function fetchAddPromotion(data) {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error adding promotion:', error);
        throw error;
    }
}
