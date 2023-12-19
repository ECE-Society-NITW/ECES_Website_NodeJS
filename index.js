require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const { connectToDB } = require('./utils/MongoDB')
const bodyParser = require('body-parser')

const app = express()

// configurations
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
connectToDB()
app.use(bodyParser.json())

// Routes
const EventRoutes = require('./routes/event_routes');
const UserRoutes = require('./routes/user_routes')
app.use("/api/events", EventRoutes)
app.use("/api/users", UserRoutes)

// Initial Connections
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`))