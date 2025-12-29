const getPhoneUnder5Tr_TruyVan = require('../service/getPhoneUnder5Tr');

module.exports.PhoneUnder50Controller = async (req, res) => {
    try{
        const result = await getPhoneUnder5Tr_TruyVan();
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'server error!'
        });
    }
}