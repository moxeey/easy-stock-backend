const mongoose=require('mongoose')

const OrderSchema=mongoose.Schema({

    total: {
        type: Number,
        default: 0
    },
    customer: {
        type: mongoose.Schema.OnjectId,
        ref: 'Customer'
    },
    shop: {
        type: mongoose.Schema.OnjectId,
        ref: 'Shop'
    },
    products: {
        type: [Object],
        required: [true,'add at least 1 product']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports=mongoose.Model('Order',OrderSchema)