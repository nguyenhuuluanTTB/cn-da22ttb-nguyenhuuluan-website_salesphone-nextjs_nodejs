import getUserInfo_TruyVan from '../service/userInfoService.js';

export const getUserInfo = async (req, res) => {
    try{
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({
                success: false,
                message: "User ID not found in token"
            });
        }

        const userInfo = await getUserInfo_TruyVan(user_id);

        if(!userInfo){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: userInfo
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
}