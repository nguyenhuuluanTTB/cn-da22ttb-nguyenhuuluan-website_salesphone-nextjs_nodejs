import addToCart_TruyVan from '../service/addToCartService';

export const addToCart = async (req, res) => {
    try{
        const {id_cart, id_product, quantity} = req.params;

        if(!id_cart || !id_product || !quantity){
            return res.status(400).json({
                success: false,
                message: "Missing data",
            });
        }

        const ketqua = await addToCart_TruyVan(id_cart, id_product, quantity);
        res.json({success: true, message: 'Thêm thành công'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: 'Server error'});
    }
}