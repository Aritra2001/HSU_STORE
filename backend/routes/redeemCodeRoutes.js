const express = require('express')
const { createRedeemCode } = require('../controllers/redeemCodeController')

const router = express.Router()

router.post('/redeem_code', createRedeemCode)

module.exports = router