const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { razorpayCreateOrder,getHex_Coins, razorpayVerifyOrder } = require('../controllers/razorpayController')

const router = express.Router()

router.use(requireAuth)

router.post('/create-order', razorpayCreateOrder)
router.post('/verify-order', razorpayVerifyOrder)
router.get('/get-hex_coins', getHex_Coins)

module.exports = router