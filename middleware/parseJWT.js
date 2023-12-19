const jwt = require('jsonwebtoken')

const parseJWT = (req, res, next) => {
    try {
        const { credential } = req.body
        if (credential) {
            req.body.user = jwt.decode(credential)
            next()
        }
        else {
            res.json({ msg: "Credential missing!" })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { parseJWT }