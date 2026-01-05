const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function getUserInfo_TruyVan(id_user) {
    try {
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
            type: QueryTypes.SELECT,
        });

        if (!result || result.length === 0) return null;
        return result[0];
    } catch (err) {
        console.error('DB query error: ', err);
        throw err;
    }
}

async function updateUserInfo_TruyVan(id_user, fullname, phonenumber, gender, address, transaction) {
    try {
        const query = `
            UPDATE user_information SET 
                fullname = ?,
                phonenumber = ?,
                gender = ?,
                address = ?
            WHERE id_user = ?
        `;

        return await sequelize.query(query, {
            replacements: [fullname, phonenumber, gender, address, id_user],
            type: QueryTypes.UPDATE,
            transaction,
        });
    } catch (err) {
        console.error('DB query error: ', err);
        throw err;
    }
}

async function updateUserAvatar_TruyVan(id_user, avatarBuffer, transaction) {
    try {
        const query = `
            UPDATE user_account
            SET avatar = ?
            WHERE id_user = ?
        `;
        return await sequelize.query(query, {
            replacements: [avatarBuffer, id_user],
            type: QueryTypes.UPDATE,
            transaction,
        });
    } catch (err) {
        console.error('DB query error: ', err);
        throw err;
    }
}

async function getUserAvatar_TruyVan(id_user) {
    try {
        const query = `
            SELECT avatar
            FROM user_account
            WHERE id_user = ?
            LIMIT 1
        `;
        const result = await sequelize.query(query, {
            replacements: [id_user],
            type: QueryTypes.SELECT,
        });

        if (!result || result.length === 0) return null;
        return result[0]?.avatar ?? null;
    } catch (err) {
        console.error('DB query error: ', err);
        throw err;
    }
}

module.exports = {
    getUserInfo_TruyVan,
    updateUserInfo_TruyVan,
    updateUserAvatar_TruyVan,
    getUserAvatar_TruyVan,
};

