const API_BASE_URL = 'http://localhost:5000/api';

export const updateUserInformation = async ({ token, fullname, phonenumber, gender, address, avatarFile }) => {
    const formData = new FormData();
    formData.append('fullname', fullname ?? '');
    formData.append('phonenumber', phonenumber ?? '');
    formData.append('gender', gender ?? '');
    formData.append('address', address ?? '');
    if (avatarFile) {
        formData.append('avatar', avatarFile);
    }

    const res = await fetch(`${API_BASE_URL}/update_user_info`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await res.json().catch(() => ({}));
    return data;
}