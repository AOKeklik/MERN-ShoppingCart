const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const hostname = 'localhost'
const dbname = 'shopingcart_db'

const server = express()

// --== connection db ==--
mongoose.connect(process.env.MONGODB_URL || `mongodb://${hostname}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected To Database..'))

// --== body query params ==--
const bodyParser = require('body-parser')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

// --== routers ==--
const productsRouter = require('./routers/productsRouter')
const ordersRouter = require('./routers/ordersRouter')

server.use('/api/products', productsRouter)
server.use('/api/orders', ordersRouter)




server.listen(port, () => console.log('Server is Success..'))