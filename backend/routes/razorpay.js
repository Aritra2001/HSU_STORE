const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { razorpayCreateOrder } = require('../controllers/razorpayController')

const router = express.Router()

router.use(requireAuth)

router.post('/create-order', razorpayCreateOrder)

module.exports = router