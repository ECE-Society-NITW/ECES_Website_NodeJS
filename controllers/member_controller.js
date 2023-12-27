const Member = require("../models/Member")

const memberController = {
    getAllMembers: (req, res) => {
        Member.find({}).then(data => {
            res.json({ success: true, data })
        }).catch(err => {
            res.json({ success: false, err })
            console.log(err)
        })
    }
}

module.exports = memberController