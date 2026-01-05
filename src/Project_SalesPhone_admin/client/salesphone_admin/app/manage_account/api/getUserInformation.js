const API_BASE_URL = 'http://localhost:8000';

const getUserInformation = async (id_user) => {
    const res = await fetch(`${API_BASE_URL}/account/info/${id_user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    return data;
}

export default getUserInformation;