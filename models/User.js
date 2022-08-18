const mongoose=require('mongoose')

// creating schema
const UserSchema=mongoose.Schema({
    name: {
        required: [true,"Please add a name"],
        type: String,
        maxlenght: [50,"Name cannot be more than 50 character"],
    },
    email: {
        type: String,require: [true,'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Enter a valid email address",
        ],
    },
    role: {
        type: String,
        enum: ['user','publisher'],
        default: 'user'
    },
    password: {
        type: String,
        require: [true,'please add password'],
        minlength: [6,'password must be atleast 6 characters'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// exporting schema model
module.exports=mongoose.model('User',UserSchema)