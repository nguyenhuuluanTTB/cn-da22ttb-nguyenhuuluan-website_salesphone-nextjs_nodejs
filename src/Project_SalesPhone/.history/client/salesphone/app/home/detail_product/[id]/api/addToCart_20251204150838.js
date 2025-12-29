const API_BASE_URL = 'http://localhost:5000/api';

export const addToCart = async({token,id_product, quantity}) => {
    try{
        const res = await fetch(`${API_BASE_URL}/addToCart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_product": id_product,
                "quantity": quantity
            }),
        });

        return res.success;
    }
    catch(err){
        console.error(err);
    }
    
}