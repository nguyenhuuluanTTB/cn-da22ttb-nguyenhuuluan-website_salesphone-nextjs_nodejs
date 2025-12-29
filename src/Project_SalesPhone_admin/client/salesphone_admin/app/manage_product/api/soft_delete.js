const API_BASE_URL = 'http://localhost:8000';

async function fetchSoftDelete (id_product) {
    const res = await fetch(`${API_BASE_URL}/product/delete`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "id_product" : id_product
        })
    });

    return res;
}

export default fetchSoftDelete;