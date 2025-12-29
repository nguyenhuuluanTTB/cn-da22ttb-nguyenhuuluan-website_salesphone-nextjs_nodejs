const API_BASE_URL = 'http://localhost:8000';

async function fetchAddProduct(data){
    const res = await fetch(`${API_BASE_URL}/product/add`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });

    //const data = await res.json();
    return res;
}

export default fetchAddProduct;