const express=require('express')
const DbConnection=require('./config/db')
const dotenv=require('dotenv')
const errorHandler=require("./middlewares/error");
const morgan=require("morgan");

// Load environment variables
dotenv.config({path: './config/config.env'})

// Connect the database
DbConnection()

// import routers
const products=require('./routes/products')
const customers=require('./routes/customers')
const orders=require('./routes/orders')
const business=require('./routes/business')
const shops=require('./routes/shops')
const categories=require('./routes/categories')
const suppliers=require('./routes/suppliers')
const supplies=require('./routes/supplies')
const transactions=require('./routes/transactions')

// Initialized the app
const app=express()

// route request to their respective router
app.use('/products',products)
app.use('/customers',customers)
app.use('/business',business)
app.use('/shops',shops)
app.use('/categories',categories)
app.use('/suppliers',suppliers)
app.use('/supplies',supplies)
app.use('/transactions',transactions)
app.use('/orders',orders)

// Middlewares
// JSON parser
app.use(express.json())
// Morgan:Logger
app.use(morgan('combined'))

// Custom Error Handler
app.use(errorHandler)

module.exports=app