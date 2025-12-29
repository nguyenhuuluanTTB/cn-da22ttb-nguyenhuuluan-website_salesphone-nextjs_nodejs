const API_BASE_URL = 'http://localhost:5000/api';

export const addToCart = async({payload}) => {
    try{
        const res = await fetch(`${API_BASE_URL}/addToCart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${payload.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_product": payload.id_product,
                "quantity": payload.quantity
            }),
        });

        const data = await res.json();
        return data;
    }
    catch(err){
        console.error(err);
    }
    
}