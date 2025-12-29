import axios from 'axios';

const API_URL = 'http://localhost:8000/stats';

export default async function fetchDashboardStats() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
}
