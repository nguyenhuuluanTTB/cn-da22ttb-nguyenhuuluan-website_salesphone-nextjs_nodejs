const addToCart_TV = require('../service/addToCartService.js');

exports.addToCart = async (req, res) => {
    try{
        const {id_cart, id_product, quantity} = req.body;

        if(!id_cart || !id_product || !quantity){
            return res.status(400).json({
                success: false,
                message: "Missing data",
            });
        }

        const ketqua = await addToCart_TV(id_cart, id_product, quantity);
        
        return res.json({
            success: true,
            message: 'Thêm thành công',
            data: ketqua
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
