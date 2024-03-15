const Razorpay = require('razorpay');
const User = require('../models/userModel');
const paypal = require('paypal-rest-sdk')
const date = new Date()

// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET
});

//paypal configuration
paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})


// Define a route to create a Razorpay order
const razorpayCreateOrder = async(req, res) => {

    const user_id = req.user._id
    const { amount } = req.body
    const user = await User.findOne({ _id: user_id })

    const options = {
        amount: amount,  // amount in the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
        receipt: (user._id) + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    };

    try {

        const response = await razorpay.orders.create(options);

        if(response.status === 'paid') {

            response.status = paid

        }

        res.status(200).json({response, user})

    } catch (error) {

        res.status(400).json({error: error.message})
    }
}

const paypalCreateOrders = async (req, res) => {

    const user_id = req.user._id
    const { amount, hex_coins } = req.body
    const user = await User.findOne({ _id: user_id })

    paypal.payment.create({
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        },
        transactions: [{
            amount: {
                total: amount,
                currency: 'USD'
            },
            description: `PAYPAL payment for ${amount} for ${hex_coins} Hex-coins`
        }]
    }, function (error, payment) {
        if (error) {
            console.error(error.message);
          } else {
            // Redirect the buyer to PayPal
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === 'approval_url') {
                res.redirect(payment.links[i].href);
              }
            }
        }
        
    })
}

const paypalExecuteOrders = async(req, res) => {

    paypal.payment.execute(paymentId, payerId, function (error, payment) {
        if (error) {
          console.error(error);
        } else {
          console.log('Payment executed successfully:', payment);
        }
      });
}

const getHex_Coins = async (req, res) => {

    const user_id = req.user._id
    const user = await User.findOne({ _id: user_id })

    res.status(200).json({hex_coins: user.hex_coins})

}

module.exports = { razorpayCreateOrder, paypalCreateOrders, paypalExecuteOrders, getHex_Coins }
