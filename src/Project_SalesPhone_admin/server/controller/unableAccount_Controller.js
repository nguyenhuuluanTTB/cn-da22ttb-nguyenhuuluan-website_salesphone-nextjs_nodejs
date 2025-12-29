import unable_account_tryvan from "../service/unable_account.js";
import sendEmail from "../util/sendEmail.js";
import accountDisabledTemplate from "../util/emailTemplates/accountDisabledTemplate.js";

const unable_account = async (req, res) => {
    try {
        const id_user = req.body.id_user;
        console.log('id_user: ', id_user);

        const { result, email } = await unable_account_tryvan(id_user);

        // Send account disabled email
        try {
            const emailSubject = "Tài khoản SalesPhone đã bị vô hiệu hóa";
            const emailHtml = accountDisabledTemplate();
            await sendEmail(email, emailSubject, emailHtml);
            console.log(`Account disabled email sent to: ${email}`);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Continue even if email fails - account is already disabled
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Error disabling account:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default unable_account;
