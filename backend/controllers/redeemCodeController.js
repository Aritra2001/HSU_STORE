const redeem_code_schema = require('../models/redeemCodeModel')
const crypto = require('crypto')

const encryptData = (data, key) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};

const decryptData = (encryptedData, key) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
};

const createRedeemCode = async (req, res) => {
    const { redeemcode } = req.body;

    try {
        if (!redeemcode) {
            throw Error('Enter a redeem code!');
        }

        if (redeemcode.length !== 6 || /\d{3}$/.test(redeemcode) === false) {
            throw Error('Enter redeem code in correct format!');
        }

        // Use a secret key for encryption and decryption
        const secretKey = process.env.SECRET_KEY; // Replace with your secret key

        // Encrypt the redeem code
        const encryptedRedeemCode = encryptData(redeemcode, secretKey);

        // Check if the encrypted redeem code already exists in the database
        const existingCode = await redeem_code_schema.findOne({ redeem_code: encryptedRedeemCode });

        if (existingCode) {
            throw Error('Redeem code already exists!');
        }

        // Store the encrypted redeem code in the database
        await redeem_code_schema.create({ redeem_code: encryptedRedeemCode });

        res.status(200).json({ message: 'Redeem code created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRedeemCode = async (req, res) => {
    try {
        // Retrieve all redeem codes from the database
        const redeemCodes = await redeem_code_schema.find({}, { redeem_code: 1 });

        // Use a secret key for decryption
        const secretKey = process.env.SECRET_KEY;// Replace with your secret key

        // Decrypt each redeem code
        const decryptedRedeemCodes = redeemCodes.map(code => {
            return decryptData(code.redeem_code, secretKey);
        });

        res.status(200).json(decryptedRedeemCodes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createRedeemCode, getRedeemCode }