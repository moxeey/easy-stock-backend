const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
    },
    qty: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true,'Category is required']
    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop',
        required: [true,'Shop is required']
    },
    images: {
        type: [String]
    }
})

module.exports=mongoose.model('Product',ProductSchema)