const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
    priority : {type:Number,required:true},
    mail: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    place: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    pic: { type: String, required: true },
    github: { type: String },
    insta: { type: String },
    linkdein: { type: String }
})

const Member = model('Member', memberSchema)

module.exports = Member;