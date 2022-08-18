const express=require('express')
const DbConnection=require('./config/db')
const dotenv=require('dotenv')
const errorHandler=require("./middlewares/error");
const morgan=require("morgan");

// Load environment variables
dotenv.config({path: './config/config.env'})

// Connect the database
// DbConnection()

// import routers
const products=require('./routes/products')
const customers=require('./routes/customers')
const orders=require('./routes/orders')

// Initialized the app
const app=express()


// Middlewares
// JSON parser
app.use(express.json())
// Morgan:Logger
app.use(morgan('combined'))

// route request to their respective router
app.use('/api/v1/products/',products)
app.use('/api/v1/customers',customers)
app.use('/api/v1/orders',orders)

// Custom Error Handler
app.use(errorHandler)


module.exports=app