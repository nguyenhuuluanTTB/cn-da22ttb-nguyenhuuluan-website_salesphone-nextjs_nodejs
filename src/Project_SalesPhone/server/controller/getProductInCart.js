const getProductInCart = require("../service/getProductInCart");

exports.getProductInCartController = async (req, res) => {
    try{
        const id_cart = req.user.id;
        const result = await getProductInCart(id_cart);
        res.json({success: true, data: result});
    }
    catch(err){
        res.status(500).json({success: false, message: "Server error"});
    }
}