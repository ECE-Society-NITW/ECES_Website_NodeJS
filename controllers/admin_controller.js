const sendMail = require("../services/sendMail")

const AdminController = {
    sendMailToRegisteredUsers: async function (req, res) {
        const email = "users email"
        try {
            await sendMail(email);
            return res.status(201).json({ success: true, message: "Check your inbox" })
        } catch (ex) {
            return res.status(501).json({ success: false, message: ex })
        }
    }
}

module.exports = AdminController