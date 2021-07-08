const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to mongodb')
  }
)

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => {
  console.log('backend server is running!')
})
