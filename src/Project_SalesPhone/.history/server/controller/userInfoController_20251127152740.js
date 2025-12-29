import getUserInfo_TruyVan from '../service/userInfoService';

export const getUserInfo = async (req, res) => {
    try{
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
}