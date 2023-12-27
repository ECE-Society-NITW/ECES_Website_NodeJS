const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
    EmailAddress: { type: String, required: true, unique: true },
    FullName: { type: String, required: true },
    NativeTo: { type: String, required: true },
    YearOfStudy: { type: String, required: true },
    Description: { type: String, required: true },
    Priority: { type: Number, required: true },
    Pic: { type: String, required: true },
    GitHub: { type: String },
    Instagram: { type: String },
    LinkedIn: { type: String }
})

const Member = model('Member', memberSchema)

module.exports = Member;