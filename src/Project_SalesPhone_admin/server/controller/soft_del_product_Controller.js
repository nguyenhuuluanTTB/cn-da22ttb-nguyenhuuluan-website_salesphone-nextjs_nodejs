import soft_delete_product from '../service/soft_delete.js';

const delete_product = async (req, res) => {
    try{
        const result  = await soft_delete_product(req.body.id_product);
        console.log(req.body);
        return res.json(result);
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

export default delete_product;