const mongoose = require("mongoose")

const connectToDB = () => {
    const URI = process.env.MONGO_DB
    mongoose.connect(URI)
        .then(() => {
            console.log("MongoDB Connected Successfully!")
        })
        .catch((ex) => console.log(ex))
}

module.exports = { connectToDB }