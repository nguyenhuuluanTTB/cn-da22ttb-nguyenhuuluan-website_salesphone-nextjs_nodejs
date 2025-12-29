const getProductHugeSales = require('../service/getProductHugeSales');

exports.HugeSalesController = async(req, res) => {
    try{
        const result = await getProductHugeSales();
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch(err){
        res.status(500).json({success: false, message: 'server error!'});
    }
};