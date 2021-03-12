const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const recipesRoutes = require('./routes/recipes')
const authRoutes = require('./routes/auth')

const db = require('./db/connection')
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))


console.log('server')
// app.use('/api/recipes', recipesRoutes)
app.use('/api/auth', authRoutes)

app.use('/api/recipes', recipesRoutes)



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

