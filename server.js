const app=require('./app')
// Get PORT
const PORT=process.env.PORT||5000

// Start the server
app.listen(PORT,() => {
    console.log(`Server has started running at port: ${PORT}`)
})
