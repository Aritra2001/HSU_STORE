const mongoose = require('mongoose')

const Schema = mongoose.Schema

const redeemCodeSchema = new Schema({
    redeem_code: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Redeem_code', redeemCodeSchema)