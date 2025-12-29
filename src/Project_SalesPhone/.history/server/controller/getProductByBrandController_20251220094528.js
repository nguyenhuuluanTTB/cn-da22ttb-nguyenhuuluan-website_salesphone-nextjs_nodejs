import getProductByBrand from "../service/getProductByBrand";

export default getProductByBrand = async(req, res) => {
    try{
        const brand = req.body.brand;
        const result = await getProductByBrand(brand);
        return result;
    }
    catch(err){
        res.status(500).json({success: false, message: "Server error in controller"});
    }
}