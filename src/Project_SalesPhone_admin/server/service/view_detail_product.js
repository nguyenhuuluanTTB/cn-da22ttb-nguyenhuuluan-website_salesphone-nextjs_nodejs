import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function view_info_product_TruyVan(id_product) {
    try {
        // Get product details
        const [productDetails] = await sequelize.query(
            `
                SELECT * FROM detail_product
                LEFT JOIN product ON detail_product.id_product = product.id_product
                LEFT JOIN promotion ON product.id_promotion = promotion.id_promotion
                WHERE detail_product.id_product = ?
                LIMIT 1;
            `,
            {
                replacements: [id_product],
                type: QueryTypes.SELECT
            }
        );

        // Get all images for this product
        const images = await sequelize.query(
            `
                SELECT image_url, is_main 
                FROM product_image
                WHERE id_product = ?
                ORDER BY is_main DESC, id_image ASC
            `,
            {
                replacements: [id_product],
                type: QueryTypes.SELECT
            }
        );

        // Combine product details with images
        if (productDetails) {
            // Create array of image URLs
            const imageUrls = images.map(img => img.image_url);

            // Add images to product details
            productDetails.images = images;
            productDetails.image_urls = imageUrls;

            // Keep the main image URL in image_url field for backward compatibility
            const mainImage = images.find(img => img.is_main === 1);
            productDetails.image_url = mainImage ? mainImage.image_url : (images[0]?.image_url || '');
        }

        return productDetails;
    }
    catch (err) {
        console.error('DB query error: ', err);
        throw err;
    }
}

export default view_info_product_TruyVan;
