const express = require('express')
const { createRedeemCode, getRedeemCode } = require('../controllers/redeemCodeController')

const router = express.Router()

router.post('/redeem_code', createRedeemCode)

router.get('/redeem_code', getRedeemCode)

module.exports = router