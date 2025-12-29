const API_URL = 'http://localhost:5000/api';

const getPhone_Brand = async(token, brand) => {
    try{
        const res = await fetch(`${API_URL}/product/product_by_brand/${brand}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return res.json();
    }
    catch(err){
        console.error(err);
    }
};
export default getPhone_Brand;