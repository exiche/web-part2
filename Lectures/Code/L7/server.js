﻿'use strict'

const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const appLocalsStringsMiddleware = require('./middlewares/app_locals')
const notFoundMiddleware = require('./middlewares/not_found')
const errorMiddleware = require('./middlewares/error')

const indexRoutes = require('./routes')
const productRoutes = require('./routes/product')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(__dirname))

app.use(appLocalsStringsMiddleware)

app.use('/', indexRoutes)
app.use('/product', productRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const { host, port } = require('./config')

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
