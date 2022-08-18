const mongoose=require('mongoose')

// creating schema
const CategorySchema=mongoose.Schema({
    name: {
        type: String,
        required: [true,'Title is required']
    }
})

// exporting schema model
module.exports=mongoose.model('Category',CategorySchema)