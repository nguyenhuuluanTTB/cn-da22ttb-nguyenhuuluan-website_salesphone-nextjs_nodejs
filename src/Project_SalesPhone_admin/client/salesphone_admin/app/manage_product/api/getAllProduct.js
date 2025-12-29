const API_BASE_URL = 'http://localhost:8000';

async function fetchGetProduct () {
    const res = await fetch(`${API_BASE_URL}/product/`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });

    const data = await res.json();
    return data;
}

export default fetchGetProduct;