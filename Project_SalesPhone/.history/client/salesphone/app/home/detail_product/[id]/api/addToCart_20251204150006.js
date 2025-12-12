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

        const text = await res.text();       // <-- BẮT BUỘC IN RA TRƯỚC
        console.log("Response raw:", text);  // sẽ hiện HTML hoặc lỗi backend

        return JSON.parse(text);  // chuyển sang parse JSON thủ công
    }
    catch(err){
        console.error(err);
    }
    
}