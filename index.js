require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const { connectToDB } = require('./utils/MongoDB')
const bodyParser = require('body-parser')

const app = express();

//configurations
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
connectToDB()
app.use(bodyParser.urlencoded({extended:true}))
// Routes
const EventRoutes = require('./routes/event_routes');
app.use("/api/events", EventRoutes)

// Initial Connections  
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`))