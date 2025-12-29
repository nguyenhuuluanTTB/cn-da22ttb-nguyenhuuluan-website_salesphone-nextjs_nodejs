import view_info_product_TruyVan from '../service/view_detail_product.js';

async function view_info_product (req, res){
    try{
        const id_product = req.body.id_product;
        const result = await view_info_product_TruyVan(id_product);
        res.status(200).json({success: true, data: result});
    }
    catch(err){
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export default view_info_product;