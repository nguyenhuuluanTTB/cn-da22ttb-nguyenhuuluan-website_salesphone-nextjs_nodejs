import getProduct_TruyVan from "../service/get_product.js";

async function getProduct (req, res){
    try{

        const result = await getProduct_TruyVan();
        res.status(200).json({success: true, data: result});

    }
    catch(err){
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export default getProduct;

