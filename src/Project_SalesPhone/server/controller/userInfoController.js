const { sequelize } = require('../config/database');
const {
    getUserInfo_TruyVan,
    updateUserInfo_TruyVan,
    updateUserAvatar_TruyVan,
    getUserAvatar_TruyVan,
} = require('../service/userInfoService');

function detectImageMime(buffer) {
    if (!buffer || buffer.length < 12) return 'application/octet-stream';
    // JPEG
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
    // PNG
    if (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0d &&
        buffer[5] === 0x0a &&
        buffer[6] === 0x1a &&
        buffer[7] === 0x0a
    ) {
        return 'image/png';
    }
    // GIF
    if (
        buffer[0] === 0x47 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x38 &&
        (buffer[4] === 0x37 || buffer[4] === 0x39) &&
        buffer[5] === 0x61
    ) {
        return 'image/gif';
    }
    // WEBP: RIFF....WEBP
    if (
        buffer[0] === 0x52 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x46 &&
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50
    ) {
        return 'image/webp';
    }
    return 'application/octet-stream';
}

const getUserInfo = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in token',
            });
        }

        const userInfo = await getUserInfo_TruyVan(user_id);

        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: userInfo,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateUserInfoController = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in token',
            });
        }

        const { fullname, phonenumber, gender, address } = req.body;
        const avatarBuffer = req.file?.buffer;

        await sequelize.transaction(async (transaction) => {
            await updateUserInfo_TruyVan(user_id, fullname, phonenumber, gender, address, transaction);
            if (avatarBuffer) {
                await updateUserAvatar_TruyVan(user_id, avatarBuffer, transaction);
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Update successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getUserAvatar = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in token',
            });
        }

        const avatar = await getUserAvatar_TruyVan(user_id);
        if (!avatar) {
            return res.status(204).send();
        }

        const buffer = Buffer.isBuffer(avatar) ? avatar : Buffer.from(avatar);
        const mime = detectImageMime(buffer);
        res.setHeader('Content-Type', mime);
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getUserInfo,
    updateUserInfoController,
    getUserAvatar,
};

