const mongoose = require('mongoose');

const schema = mongoose.Schema

const catagorySchema = new schema({
    catagory: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('category', catagorySchema)