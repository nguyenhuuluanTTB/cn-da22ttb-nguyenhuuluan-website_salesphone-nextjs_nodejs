import getOnePhone_TruyVan from "../service/oneProductService";

export const getOnePhone = async (req, res) => {
    try{
        const phone = await getOnePhone_TruyVan();
        res.json({success: true, data: phone});
    }
    catch(err){
        res.status(500).json({success: false, message: "Server error"});
    }
}