const API_BASE_URL = 'http://localhost:8000';

const unable_account = async(id_user) => {
    const res = await fetch(`${API_BASE_URL}/account/unable`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id_user": id_user})
    });
    return res;
};

export default unable_account;