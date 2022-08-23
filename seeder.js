const fs=require('fs')
const mongoose=require('mongoose')
const dotenv=require('dotenv')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to database
mongoose.connect(process.env.MONGO_URL)

// Import models
const Category=require('./models/Category')
const Business=require('./models/Business')
const Shop=require('./models/Shop')
const Supplier=require('./models/Supplier')
const Supply=require('./models/Supply')
const Product=require('./models/Product')
const Order=require('./models/Order')
const Customer=require('./models/Customer')
const Transaction=require('./models/Transaction')


// Read and export json files
const categories=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/categories.json`,'utf-8')
)
const business=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/business.json`,'utf-8')
)
const shops=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/shops.json`,'utf-8')
)
const suppliers=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/suppliers.json`,'utf-8')
)
const supplies=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/supplies.json`,'utf-8')
)
const products=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/products.json`,'utf-8')
)
const orders=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/orders.json`,'utf-8')
)
const customers=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/customers.json`,'utf-8')
)
const transactions=JSON.parse(
    fs.readFileSync(`${__dirname}/_data/transactions.json`,'utf-8')
)


// Import data to database
const importData=async () => {
    try {
        await Category.create(categories)
        await Business.create(business)
        await Supplier.create(suppliers)
        await Shop.create(shops)
        await Supply.create(supplies)
        await Product.create(products)
        await Order.create(orders)
        await Customer.create(customers)
        await Transaction.create(transactions)

        console.log('Import completed!')
        process.exit()
    } catch(error) {
        console.log(error)
    }
}

// Destroy data from database
const destroyData=async () => {
    try {
        await Category.deleteMany()
        await Business.deleteMany()
        await Supplier.deleteMany()
        await Shop.deleteMany()
        await Supply.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        await Customer.deleteMany()
        await Transaction.deleteMany()

        console.log('Data destroy completed!')
        if(process.argv[2]!=='-r') process.exit()
    } catch(error) {
        console.log(error)
    }
}

// Reset database
const resetData=async () => {
    try {
        await destroyData()
        await importData()
    } catch(error) {
        console.log(error)
    }
}

// check terminal args and take action
if(process.argv[2]==='-i') {
    importData()
} else if(process.argv[2]==='-d') {
    destroyData()
} else if(process.argv[2]==='-r') {
    resetData()
}