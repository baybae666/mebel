require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const db = require('./db')
const models = require('./models/model')
const router = require('./Routes/index')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const errorMiddleware = require('./middleware/errorMiddleware');
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorMiddleware);
// app.use(errorHandler)
const server = require('http').createServer(app)

const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
        throw e
    }
}

start()