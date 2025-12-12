const API_BASE_URL = 'http://localhost:5000/api';

export const updateUserInformation = async ({token, fullname, phonenumber, gender, address}) => {
    const res = await fetch(`${API_BASE_URL}/update_user_info`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            "fullname": fullname,
            "phonenumber": phonenumber,
            "gender": gender,
            "address": address
        }), 
    });

    const data = await res.json();
    return data;
} 