// Init server vars
const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const logger = require('./services/logger.service')

const app = express()
const http = require('http').createServer(app)

const port = process.env.PORT || 3030

// Init session configuration
const session = expressSession({
    secret: 'Splendor online 2022',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})


// App uses
app.use(session)
app.use(express.json())


// Serve static files from '/public' dir on production.
// Configure cors on development
if (process.env.NODE_ENV === 'production') app.use(express.static(path.resolve(__dirname, 'public')))
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Start listen
http.listen(port, logger.info(`running on ${port}`))

// Sanity Check