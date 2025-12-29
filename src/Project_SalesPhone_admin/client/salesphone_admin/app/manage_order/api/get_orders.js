import axios from 'axios';

const API_URL = 'http://localhost:8000/order';

export default async function fetchGetOrders() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}
