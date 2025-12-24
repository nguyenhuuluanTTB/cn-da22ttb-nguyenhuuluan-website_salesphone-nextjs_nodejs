const  getProductByBrand = require("../service/getProductByBrand.js");

const ProductByBrand = async(req, res) => {
    try{
        const { brand } = req.params;
        console.log('ProductByBrand controller - received brand:', brand);
        
        if(!brand){
            return res.status(400).json({
                success: false,
                message: "Brand is required"
            });
        }
        
        const result = await getProductByBrand(brand);
        console.log('ProductByBrand controller - result count:', result ? result.length : 0);
        
        return res.status(200).json({
            success: true,
            data: result || []
        });
    }
    catch(err){
        console.error('ProductByBrand controller error:', err);
        return res.status(500).json({
            success: false, 
            message: "Server error in controller",
            error: err.message
        });
    }
}

module.exports = ProductByBrand;