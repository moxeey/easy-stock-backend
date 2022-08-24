const mongoose=require('mongoose')

// creating schema
const TransactionSchema=mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    for: {
        type: String,
        enum: ['Order','Supply']
    },
    // Order or Supply ID
    ref: {
        type: mongoose.Schema.ObjectId
    },
    remark: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// exporting schema model
module.exports=mongoose.model('Transaction',TransactionSchema)