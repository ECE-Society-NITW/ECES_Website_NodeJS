require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const authorize = require('./utils/authenticateGoogle')
const { connectToDB } = require('./utils/MongoDB')
const bodyParser = require('body-parser')
const process = require('process');
const fs = require('fs').promises;
const path = require('path')
const app = express()

// configurations
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
connectToDB()
authorize()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

///////////////////////////////////////////////////////////////////

// Routes
const EventRoutes = require('./routes/event_routes');
const UserRoutes = require('./routes/user_routes')
const MemberRoutes = require('./routes/member_routes')
const { googleDriveRouter } = require('./routes/google_drive_route')
app.use("/api/events", EventRoutes)
app.use("/api/users", UserRoutes)
app.use("/api/members", MemberRoutes)
app.use("/api/google_drive", googleDriveRouter)

// Initial Connections
const PORT = process.env.PORT
const server = app.listen(PORT, () => console.log(`Server started at PORT : ${server.address().port}`))
