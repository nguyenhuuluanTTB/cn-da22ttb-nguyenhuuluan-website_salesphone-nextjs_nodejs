export async function deleteCartItem(token, id_product) {
    try {
        const response = await fetch('http://localhost:5000/api/cart/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_product })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Delete cart item error:', error);
        throw error;
    }
}

export async function deleteAllCartItems(token) {
    try {
        const response = await fetch('http://localhost:5000/api/cart/delete-all', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Delete all cart items error:', error);
        throw error;
    }
}
