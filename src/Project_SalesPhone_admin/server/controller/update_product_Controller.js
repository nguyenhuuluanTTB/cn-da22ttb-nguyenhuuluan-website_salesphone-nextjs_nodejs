import update_product_truyvan from '../service/update_product.js';

const update_product = async (req, res) => {
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

        const result = await update_product_truyvan(productData);
        res.json(result);
    }
    catch (err) {
        console.error('Error in update_product controller: ', err);
        res.status(500).json({
            success: false,
            message: 'Error server while updating product =(('
        });
    }
}

export default update_product;
