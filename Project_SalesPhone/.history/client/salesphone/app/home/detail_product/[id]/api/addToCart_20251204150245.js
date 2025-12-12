const API_BASE_URL = 'http://localhost:5000/api';

export const addToCart = async({token,id_product, quantity}) => {
    try{
        const res = await fetch(`${API_BASE_URL}/addToCart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_product, quantity }),
        });

        const text = await res.text();
        console.log('Raw response:', text);

        try{
            return JSON.parse(text);
        }catch{
            console.error('Không phải JSON → Backend đang trả HTML');
        }
    }
    catch(err){
        console.error('Fetch error:', err);
    }
}
