import { getNewPhone } from "../service/productService";

export const getNewPhone = async (req, res) => {
    const { promt } = req.query;

    try{
        const phones = await getNewPhone(prompt);
        res.json({ success: true, data: phones });
    }
    catch (err){
        res.status(500).json({ success: false, message: "Server error" });
    }
};