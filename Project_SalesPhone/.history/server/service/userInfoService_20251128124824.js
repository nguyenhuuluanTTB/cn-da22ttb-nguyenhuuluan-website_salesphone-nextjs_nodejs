const { sequelize } = require('../config/database');

 async function getUserInfo_TruyVan (id_user) {
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

async function updateUserInfo (id_user, fullname, phonenumber, gender, address){
    try{

        const query = `
            update user_information set 
                fullname = ?,
                phonenumber = ?,
                gender = ?,
                address = ?
            where id_user = ?
        `;

        const result = await sequelize.query(query, {
            replacements: [fullname, phonenumber, gender, address ,id_user],
            type: 'update'
        });

        if(!result) return null;

    }
    catch(err){
        console.error("DB query error: ", err);
        throw err;
    }
}

module.exports={getUserInfo_TruyVan, updateUserInfo}