import getOnePhone_TruyVan from "../service/oneProductService.js";

export const getOnePhone = async (req, res) => {
    try{
        const {product_code} = req.params;

        if(!product_code){
            return res.status(400).json({
                success: false,
                message: "Missing product_code",
            });
        }

        const phone = await getOnePhone_TruyVan(product_code);
        res.json({success: true, data: phone});
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
}