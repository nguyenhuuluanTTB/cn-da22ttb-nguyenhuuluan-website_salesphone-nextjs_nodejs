import getUserInformation from '../service/getUserInformation.js';

async function getUserInformation_Controller(req, res) {
    try {
        const id = req.params.id;
        const result = await getUserInformation(id);
        // Normalize result: prefer a single object. Convert avatar Buffer/mediumblob to base64 data URL.
        let data = null;
        try {
            const row = Array.isArray(result) ? (result[0] || null) : result;
            if (row) {
                const r = { ...row };
                if (r.avatar) {
                    try {
                        let buf = r.avatar;
                        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                        const base64 = buf.toString('base64');
                        // detect basic MIME from header bytes
                        let mime = 'image/png';
                        if (buf[0] === 0xFF && buf[1] === 0xD8) mime = 'image/jpeg';
                        else if (buf[0] === 0x89 && buf[1] === 0x50) mime = 'image/png';
                        else if (buf[0] === 0x47 && buf[1] === 0x49) mime = 'image/gif';
                        else mime = 'application/octet-stream';
                        r.avatar = `data:${mime};base64,${base64}`;
                    } catch (e) {
                        console.error('Error encoding avatar to base64 for single row:', e);
                    }
                }
                data = r;
            } else {
                data = null;
            }
        } catch (e) {
            console.error('Error processing user information result:', e);
            data = null;
        }

        // add debug info about avatar presence
        try {
            const avatarPresent = !!(data && data.avatar);
            console.log(`getUserInformation: id=${id} avatarPresent=${avatarPresent}`);
            if (avatarPresent && typeof data.avatar === 'string') {
                console.log(`avatar length: ${data.avatar.length}`);
            }
            // expose a boolean flag to help client-side debugging
            const out = { ...data, avatarPresent };
            res.json({ success: true, data: out });
        } catch (e) {
            res.json({ success: true, data });
        }
    } catch (err) {
        console.error('Controller error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export default getUserInformation_Controller;
