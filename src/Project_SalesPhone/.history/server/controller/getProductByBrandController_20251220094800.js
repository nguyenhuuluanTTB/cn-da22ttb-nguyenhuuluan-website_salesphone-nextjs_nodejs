import getProductByBrand from "../service/getProductByBrand";

export default ProductByBrand = async(req, res) => {
    try{
        const brand = req.params.brand;
        const result = await getProductByBrand(brand);
        return result;
    }
    catch(err){
        res.status(500).json({success: false, message: "Server error in controller"});
    }
}