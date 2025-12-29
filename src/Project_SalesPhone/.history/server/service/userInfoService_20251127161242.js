const { sequelize } = require('../config/database');

module.exports = async function getUserInfo_TruyVan (id_user) {
    try{

        const query = `
            SELECT 
                i.fullname,
                i.phonenumber,
                i.gender,
                i.address,
                u.name,
                u.email
            FROM user_information AS i
            LEFT JOIN user_account AS u ON i.id_user = u.id_user
            WHERE i.id_user = ?
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