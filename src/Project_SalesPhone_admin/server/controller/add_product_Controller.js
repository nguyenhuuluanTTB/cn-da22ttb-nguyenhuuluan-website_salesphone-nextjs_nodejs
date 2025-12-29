import addProduct_TruyVan from "../service/add_product.js";

async function addProduct(req, res) {
    try {
        const productData = req.body;

        // Parse image URLs if provided as string (newline-separated)
        if (productData.image_url && typeof productData.image_url === 'string') {
            // Split by newlines and filter out empty lines
            const imageUrls = productData.image_url
                .split('\n')
                .map(url => url.trim())
                .filter(url => url.length > 0);

            productData.image_url = imageUrls.length > 0 ? imageUrls : null;
        }

        const result = await addProduct_TruyVan(productData);
        res.json({ success: true, data: result });
    }
    catch (err) {
        console.error('Error in add_product controller:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export default addProduct;
