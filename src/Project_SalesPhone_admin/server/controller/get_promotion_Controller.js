import get_promotion_truyvan from '../service/get_promotion.js';

const get_promotion = async(req, res) => {
    try{
        const result = await get_promotion_truyvan();
        res.json(result);
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server error while get promotion'
        })
    }
}

export default get_promotion;