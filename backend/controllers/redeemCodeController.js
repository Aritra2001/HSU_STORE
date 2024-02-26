const redeem_code_schema = require('../models/redeemCodeModel')
const crypto = require('crypto')


const createRedeemCode = async (req, res) => {

    const { redeemcode } = req.body

    try {
        if(!redeemcode) {
            throw Error('Enter a redeem code!')
        }

        if(redeemcode.length !== 6 || /\d{3}$/.test(redeemcode) === false) {
            throw Error('Enter redeem code in correct format!')
        }

        const hash_Code = crypto.createHash('sha256').update(redeemcode).digest('hex')
        const code = await redeem_code_schema.findOne({ redeem_code: hash_Code })
        
        if(code) {
            throw Error('Redeem code already exits!')
        }

        const hash_redeemCode = crypto.createHash('sha256').update(redeemcode).digest('hex')
        await redeem_code_schema.create({ redeem_code: hash_redeemCode })

        res.status(200).json({message: 'Redeem code created successfully!'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createRedeemCode }