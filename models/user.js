const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String, enum: [
            "User",
            "General Secretary",
            "Additional Secretary",
            "Joint Secretary",
            "Executive Member",
            "Volunteer"
        ],
        default: 'User',
        required: true
    },
    phone: { type: String },
    branch: { type: String },
    course: { type: String },
    yearOfJoining: { type: Number },
    createdOn: { type: Date }
});

userSchema.pre('save', (next) => {
    this.createdOn = new Date()
    next()
})

const User = model('User', userSchema)
module.exports = User;
