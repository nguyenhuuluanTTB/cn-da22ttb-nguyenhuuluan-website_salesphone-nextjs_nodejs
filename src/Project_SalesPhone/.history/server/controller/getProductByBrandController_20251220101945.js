const  getProductByBrand = require("../service/getProductByBrand.js");

const ProductByBrand = async(req, res) => {
    try{
        const { brand } = req.params;
        if(!brand){
            res.status(400).json({
                success: false,
                message: "Brand is required"
            })
        };
        const result = await getProductByBrand(brand);
         return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch(err){
        res.status(500).json({success: false, message: "Server error in controller"});
    }
}

module.exports = ProductByBrand;