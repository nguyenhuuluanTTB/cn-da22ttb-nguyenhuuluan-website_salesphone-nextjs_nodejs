const { sequelize } = require('../config/database');

module.exports = async function getAllPromotions() {
    try {
        const [rows] = await sequelize.query(
            "SELECT * FROM promotion"
        );
        return rows;
    } catch (err) {
        console.error("DB query error: ", err);
        return [];
    }
};
