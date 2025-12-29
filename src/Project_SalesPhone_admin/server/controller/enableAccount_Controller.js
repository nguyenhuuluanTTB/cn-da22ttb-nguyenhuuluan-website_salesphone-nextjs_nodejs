import enable_account_tryvan from "../service/enable_account.js";
import sendEmail from "../util/sendEmail.js";
import accountEnabledTemplate from "../util/emailTemplates/accountEnabledTemplate.js";

async function enable_account(req, res) {
    try {
        const id_user = req.body.id_user;
        console.log('id_user: ', id_user);

        const { result, email } = await enable_account_tryvan(id_user);

        // Send account enabled email
        try {
            const emailSubject = "Tài khoản SalesPhone đã được kích hoạt";
            const emailHtml = accountEnabledTemplate();
            await sendEmail(email, emailSubject, emailHtml);
            console.log(`Account enabled email sent to: ${email}`);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Continue even if email fails - account is already enabled
        }

        res.json({ success: true });
    }
    catch (err) {
        console.error('Error enabling account:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export default enable_account;
