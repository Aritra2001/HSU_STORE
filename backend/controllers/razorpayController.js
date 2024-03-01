const Razorpay = require('razorpay');
const User = require('../models/userModel');
const date = new Date()

// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET
});

// Define a route to create a Razorpay order
const razorpayCreateOrder = async(req, res) => {

    const user_id = req.user._id
    const { amount, hex_coins } = req.body
    const user = await User.findOne({ _id: user_id })

    const options = {
        amount: amount,  // amount in the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
        receipt: (user._id) + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    };

    try {

        const response = await razorpay.orders.create(options);

        if(response.status === 'paid') {
            await User.findByIdAndUpdate(user._id, {hex_coins: hex_coins})
        }

        res.status(200).json({user})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { razorpayCreateOrder }
