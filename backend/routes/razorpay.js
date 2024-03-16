const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { razorpayCreateOrder, paypalCreateOrders, paypalExecuteOrders, getHex_Coins, razorpayVerifyOrder } = require('../controllers/razorpayController')

const router = express.Router()

router.use(requireAuth)

router.post('/create-order', razorpayCreateOrder)
router.post('/verify-order', razorpayVerifyOrder)
router.post('/create-ovs-orders', paypalCreateOrders)
router.post('/create-ovs-execute', paypalExecuteOrders)
router.get('/get-hex_coins', getHex_Coins)

module.exports = router