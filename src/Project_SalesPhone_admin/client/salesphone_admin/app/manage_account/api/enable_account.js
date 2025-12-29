const API_BASE_URL = 'http://localhost:8000';

async function enable_account (id_user) {
    const res = await fetch(`${API_BASE_URL}/account/enable`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id_user":id_user})
    });
    console.log('res: ', res);
    return res;
}

export default enable_account;