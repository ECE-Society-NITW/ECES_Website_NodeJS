const Member = require("../models/Member")

const memberController = {
    getAllMembers: async (req, res) => {
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