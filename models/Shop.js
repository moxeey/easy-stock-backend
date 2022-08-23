const mongoose=require('mongoose')

// creating schema
const ShopSchema=mongoose.Schema({
    business: {
        type: mongoose.Schema.ObjectId,
        ref: 'Business',
        required: [true,'Business is required']
    },
    title: {
        type: String,
        required: [true,'Shop name is required'],
        minlength: [3,'Shop name must be at least 3 characters'],
    },
    phone: {
        type: String,
        required: [true,'Shop phone number is required'],
        minlength: [11,'valid phone number is required']
    },
    // email: {
    //     type: String,
    //     required: [true,'Shop email is required'],
    // },
    address: {
        type: String,
        required: [true,'Shop address is required'],
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ["Point"],
            //   required: true,
        },
        coordinates: {
            type: [Number],
            // required: true,
            index: "2dsphere",
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    }
})

// exporting schema model
module.exports=mongoose.model('Shop',ShopSchema)