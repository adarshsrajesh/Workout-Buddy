const express = require('express')
require('dotenv').config()
const workoutRoutes = require('./Routes/workouts')
const app = express()
const mongoose =require('mongoose')

app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})


app.use('/api/workouts',workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
     app.listen(process.env.PORT,()=>{
    console.log('listening on port',process.env.PORT)
    })
 })

 .catch((error)=>{console.log(error)})