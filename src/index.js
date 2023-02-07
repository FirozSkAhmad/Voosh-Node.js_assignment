const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const route = require('./routes')

const app = express()

app.use(express.json())



mongoose.connect(process.env.CLUSTER,
    { useNewUrlParser: true }
)
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log(err.message));


app.use('/', route)

app.listen(process.env.PORT, () => {
    console.log("Express app is running on port:" + process.env.PORT)
})