const { sequelize } = require('./config/database');
const getProductByBrand = require('./service/getProductByBrand');

async function test() {
    try {
        console.log('Connecting to DB...');
        await sequelize.authenticate();
        console.log('Connected.');

        // 1. Check all brands
        const [brands] = await sequelize.query("SELECT DISTINCT brand FROM product");
        console.log('Available brands in DB:', brands.map(b => b.brand));

        if (brands.length === 0) {
            console.log('WARNING: No products found in DB at all!');
        } else {
            // 2. Test fetching for the first brand found
            const firstBrand = brands[0].brand;
            if (firstBrand) {
                console.log(`\nTesting service for brand: "${firstBrand}"`);
                const products = await getProductByBrand(firstBrand);
                console.log(`Found ${products.length} products for ${firstBrand}`);
                if (products.length > 0) {
                    console.log('Sample product:', products[0].name_product);
                }
            }
        }

        // 3. Test specifically for 'samsung' or 'apple' if not tested above
        const testBrands = ['Samsung', 'Apple', 'Xiaomi', 'Oppo'];
        for (const b of testBrands) {
            console.log(`\nTesting for "${b}"...`);
            const res = await getProductByBrand(b);
            console.log(`Found ${res.length} items.`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sequelize.close();
    }
}

test();
