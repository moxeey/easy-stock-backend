const mongoose=require('mongoose')

const SupplySchema=mongoose.Schema({

    total: {
        type: Number,
        default: 0
    },
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: 'Supplier',
        required: [true,'supplier is required']

    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop',
        required: [true,'shop is required']

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

module.exports=mongoose.model('Supply',SupplySchema)