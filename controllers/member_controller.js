const Member = require("../models/member")

const memberController = {
    getAllMembers: (req, res) => {
        try{
            Member.find({}).then(data => {
                res.json({ success: true, data })
            }).catch(err => {
                res.json({ success: false, err })
                console.log(err)
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = memberController