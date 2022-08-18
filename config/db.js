const mongoose=require('mongoose')

const DbConnection=async () => {
    try {

        const conn=await mongoose.connect(process.env.MONGO_URL)
        // console.log(`Database connected on:${conn.connection.host}`)
    } catch(error) {
        console.error(error)
    }
}

module.exports=DbConnection;