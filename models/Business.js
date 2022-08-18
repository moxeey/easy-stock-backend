const mongoose=require('mongoose')

// creating schema
const BusinessSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true,'Business name is required'],
        minlength: [3,'Business name must be at least 3 characters'],
    },
    phone: {
        type: String,
        required: [true,'Business phone number is required'],
        minlength: [11,'valid phone number is required']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Enter a valid email address",
        ],
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please use a valid URL with http or https",
        ],
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active','suspended']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // subscription: {
    //     type: {
    //         type: String,
    //         enum: ['regular','silver','gold',]
    //     },
    //     period: {
    //         type: Number,
    //     },
    //     subscribedAt: {
    //         type: Date.now()
    //     }
    // }
})

// exporting schema model
module.exports=mongoose.model('Business',BusinessSchema)