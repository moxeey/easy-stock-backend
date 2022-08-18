const mongoose=require('mongoose')

// creating schema
const SupplierSchema=mongoose.Schema({
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
})

// exporting schema model
module.exports=mongoose.model('Supplier',SupplierSchema)