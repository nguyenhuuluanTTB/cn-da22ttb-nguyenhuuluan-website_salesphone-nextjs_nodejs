const API_URL = 'http://localhost:5000';

const fetchPhoneUnder5Tr = async (token){
    const res = await fetch(`${API_URL}/api/product/under5Tr`,{
        method: 'GET',
        headers: {
            'Authorization':  `Baerer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
}
export default fetchPhoneUnder5Tr;