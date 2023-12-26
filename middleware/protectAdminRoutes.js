const jwt = require('jsonwebtoken')

const protectAdminRoutes = (req, res, next) => {
    try {
        const { credential } = req.body
        if (credential) {
            req.body.user = jwt.decode(credential)
            console.log(req.body.user)
            next()
        }
        else {
            res.json({ msg: "Credential missing!" })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { protectAdminRoutes }