const mongoose = require('mongoose')


//User Schema
const Schema =  mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpire: {
        type: Date
    },
    verifyToken : {
        type: String
    },
    verifiedStatus: {
        type: Boolean
    },
    passwordUpdateDate: {
        type: Date
    },
    hex_coins: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Shop_User', userSchema)