const API_BASE_URL = 'http://localhost:8000';

async function fetchUpdateProduct(data){
    const res = await fetch(`${API_BASE_URL}/product/update`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return res;
}

export default fetchUpdateProduct;