const express = require('express')
const mongoose = require('mongoose')
const app = express()
const hbs = require('hbs')
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 3025
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const news = require('./model/newsModel')

mongoose.connect( process.env.MONGO_URL || 'mongodb://localhost:27017/NEWSNOW')

const Newsroute = require('./routes/homeRoute')
app.use('/', Newsroute)









app.listen(port, () => {
    console.log(`News app listening at http://localhost:${port}`)
})
