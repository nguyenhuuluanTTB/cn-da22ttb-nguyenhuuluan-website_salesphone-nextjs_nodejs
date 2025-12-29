const getProductSales50 = require('../service/getProductSale50');

module.exports.ProductSales50Controller = async (req, res) => {
    try{
        const result = await getProductSales50();
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch(err){
        res.status(500).json({success: false, message: 'server error!'});
    }
}