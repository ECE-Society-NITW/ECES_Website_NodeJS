const mongoose = require("mongoose")
const URI = process.env.MONGO_DB

const connectToDB = () => {
    try {
        mongoose.connect(URI).catch((ex) => console.log(ex))
        console.log('connected to mongodb')
    } catch (ex) {
        console.log(ex)
    }
}

module.exports = { connectToDB }