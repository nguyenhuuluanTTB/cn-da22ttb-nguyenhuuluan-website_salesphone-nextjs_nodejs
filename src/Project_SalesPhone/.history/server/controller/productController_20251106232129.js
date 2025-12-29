import { getNewPhone_TruyVan } from "../service/productService.js";

export const getNewPhone = async (req, res) => {

    try{
        const phones = await getNewPhone_TruyVan();
        res.json({ success: true, data: phones });
    }
    catch (err){
        res.status(500).json({ success: false, message: "Server error" });
    }
};