import getAccount_TruyVan from "../service/getAccount.js";

async function getAccount (req, res) {
    try{
        const result = await getAccount_TruyVan();
        res.json({success: true, data: result});
    }
    catch(err){
        res.status(500).json({success: false, message: 'Server error =(('});
    }
}

export default getAccount;