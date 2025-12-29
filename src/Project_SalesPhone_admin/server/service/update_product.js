import { DataTypes, QueryTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

async function update_product_truyvan(productData) {
    const t = await sequelize.transaction();

    try {

        //update cho bảng product
        await sequelize.query(
            `
                UPDATE product 
                    SET 
                        name_product = ?,
                        price = ?,
                        \`type\` = ?,
                        brand = ?,
                        quantity = ?,
                        status = ?,
                        id_promotion = ?,
                        product_code = ?
                WHERE id_product = ?
            `,
            {
                replacements: [
                    productData.name_product,
                    productData.price,
                    productData.type,
                    productData.brand,
                    productData.quantity,
                    productData.status,
                    productData.id_promotion,
                    productData.product_code,
                    productData.id_product
                ],
                type: QueryTypes.UPDATE,
                transaction: t
            }

        );

        //update cho bảng detail_product
        await sequelize.query(
            `
                UPDATE detail_product
                    SET 
                        color = ?,
                        rom = ?,
                        ram = ?,
                        screen_size = ?,
                        battery = ?,
                        description_phone = ?,
                        warranty = ?,
                        front_camera = ?,
                        rear_camera = ?,
                        cpu_detail = ?,
                        operating_system = ?,
                        chip_nfc = ?,
                        resolution = ?,
                        screen_frequency = ?,
                        video = ?
                    WHERE id_product = ?
            `,
            {
                replacements: [
                    productData.color,
                    productData.rom,
                    productData.ram,
                    productData.screen_size,
                    productData.battery,
                    productData.description_phone,
                    productData.warranty,
                    productData.front_camera,
                    productData.rear_camera,
                    productData.cpu_detail,
                    productData.operating_system,
                    productData.chip_nfc,
                    productData.resolution,
                    productData.screen_frequency,
                    productData.video,
                    productData.id_product
                ],
                type: QueryTypes.UPDATE,
                transaction: t
            }
        );


        // Handle multiple images if provided
        if (productData.image_url && productData.image_url.length > 0) {
            // First, delete all existing images for this product
            await sequelize.query(
                `
                    DELETE FROM product_image
                    WHERE id_product = ?
                `,
                {
                    replacements: [productData.id_product],
                    type: QueryTypes.DELETE,
                    transaction: t
                }
            );

            // Then insert new images
            // image_url can be either a string (single URL) or an array of URLs
            const imageUrls = Array.isArray(productData.image_url)
                ? productData.image_url
                : [productData.image_url];

            // Insert each image URL
            for (let i = 0; i < imageUrls.length; i++) {
                const imageUrl = imageUrls[i].trim();
                if (imageUrl) { // Only insert non-empty URLs
                    await sequelize.query(
                        `
                            INSERT INTO product_image (id_product, image_url, is_main)
                            VALUES (?, ?, ?)
                        `,
                        {
                            replacements: [
                                productData.id_product,
                                imageUrl,
                                i === 0 ? 1 : 0  // First image is main
                            ],
                            type: QueryTypes.INSERT,
                            transaction: t
                        }
                    );
                }
            }
        }


        await t.commit();
        return { success: true, message: 'Cập nhật sản phẩm thành công' };

    }
    catch (err) {
        await t.rollback();
        console.error('Error updating product: ', err);
        throw err;
    }
}

export default update_product_truyvan;