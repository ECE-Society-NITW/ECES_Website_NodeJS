const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();

//configurations
require('dotenv').config()
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

// Routes
// app.use("/api/events", EventRoutes)

// Initial Connections  
const URL = process.env.MONGO_DB
try {
    mongoose.connect(URL).catch((ex) => console.log(ex))
    console.log('connected to mongodb')
} catch (ex) {
    console.log(ex)
}

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`))