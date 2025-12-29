const API_URL = 'http://localhost:5000';

const fetchPhoneUnder5Tr = async (token) => {
    const res = await fetch(`${API_URL}/api/product/under5Tr`,{
        method: 'GET',
        headers: {
            'Authorization':  `Baerer ${token}`,
            'Content-Type' : 'application/json'
        }
    });
    const data = await res.json();
    return data;
}
export default fetchPhoneUnder5Tr;