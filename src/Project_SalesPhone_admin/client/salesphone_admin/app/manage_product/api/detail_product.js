const API_BASE_URL = 'http://localhost:8000';

async function fetchDetailProduct(id_product){
    const res = await fetch(`${API_BASE_URL}/product/view_detail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           "id_product" : id_product  
        })
    });
    const data = await res.json();
    return data;
}

export default fetchDetailProduct;