const jwt = require('jsonwebtoken')
const { parseStudentEmail } = require('../utils/BranchYear')
const User = require('../models/user')

const UserController = {
    getUser: async (req, res) => {
        try {
            const { credential } = req.params
            const { email } = jwt.decode(credential)
            User.findOne({ email })
                .then((data) => {
                    if (data)
                        res.json(data)
                    else
                        res.json({ msg: "User not found!" })

                })
                .catch(err => console.log(err))
        } catch (ex) {
            res.send({ "Error": ex })
        }
    },
    createUser: async (req, res) => { // Creates & returns the Object in DB. if already present it will return that object
    try {
            const { email, name, picture } = req.body.user
            User.findOne({ email }).then(async (data) => {
                if (!data) {
                    const { details: { yearOfJoining, branch, course } } = parseStudentEmail(email)
                    const user = await User.create({ name, picture, email, branch, course, yearOfJoining })
                    res.json(user)
                }
                else {
                    res.json(data)
                }
            }).catch(err => console.log(err))
        } catch (ex) {
            res.send({ "Error": ex })
        }
    },
    deleteUser: (req, res) => {
        try {
            const { email } = req.body.user
            User.findOneAndDelete({ email })
                .then((data) => {
                    if (data)
                        res.json(data)
                    else
                        res.json({ msg: "User not found!" })
                })
                .catch(err => console.log(err))
        } catch (ex) {
            res.send({ "Error": ex })
        }
    }
}

module.exports = UserController