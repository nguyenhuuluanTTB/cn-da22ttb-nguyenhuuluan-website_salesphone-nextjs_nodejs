const { sequelize } = require('../config/database');

module.exports = async function getUserInfo_TruyVan () {
    try{

        const query = `
            SELECT
                fullname,
                phonenumber,
                gender,
                address
            FROM user_information
            WHERE id_user = ?
        `;

        const result = await sequelize.query(query, {
            replacements: [id_user],
            type: 'SELECT'
        });

        if(!result || result.length === 0) return null;

        return result[0];

    }
    catch(err){
        console.error("DB query error: ", err);
        throw err;
    }
}