const mongoose=require('mongoose')

const CustomerSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        minlength: [3,'Name cannot be less than 3 characters'],

    },
    phone: {
        type: String,
        required: ['Please add a phone number'],
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Enter a valid email address",
        ],
    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop',
        required: [true,'Shop is required']
    }

})

module.exports=mongoose.model('Customer',CustomerSchema)