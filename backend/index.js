require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const redeemCodeRoutes = require('./routes/redeemCodeRoutes')
const razorpayRoutes = require('./routes/razorpay')

//express app
const app = express()

//cors
const allowedOrigins = [
    "http://localhost:3000", "https://hsu-store-frontend.vercel.app"

];

app.use(cors({
    origin:function(origin,callback){
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
}))

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

//routes
app.use('/api/users', userRoutes)
app.use('/api/admin', redeemCodeRoutes)
app.use('/api/users', razorpayRoutes)

//database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening to port
    app.listen(process.env.PORT, () => {
        console.log('Listening for requests on PORT', process.env.PORT)
    })
})
.catch((err) => {
    console.log('server encountered an error', err)
})