const API_BASE_URL = 'http://localhost:8000';

const fetch_get_promotion = async () => {
    const result = await fetch(`${API_BASE_URL}/promotion`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await result.json();
    return data;
}

export default fetch_get_promotion;