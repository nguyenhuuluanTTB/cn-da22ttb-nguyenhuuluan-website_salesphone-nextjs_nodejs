const API_BASE_URL = 'http://localhost:8000';

const getAll_Account = async() => {
    const res = await fetch(`${API_BASE_URL}/account/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    return data;
}

export default getAll_Account;