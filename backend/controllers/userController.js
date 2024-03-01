const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')
const { Resend } = require('resend')


//jwt Token create function with expiration time
const createToken_Time = function (_id) {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '20m'})
}

//jwt Token create function with no expiration time
const createToken = function (_id) {
    return jwt.sign({_id}, process.env.SECRET)
}

//Resend instantiation
const resendinstance = new Resend(process.env.RESET_API)

//Signup API
const SignupUser = async (req, res) => {

    const { email, name, Password, phone } = req.body

    try {

        if(!email || !Password || !name || !phone) {
            throw Error('All fields must be filled!')
        }

        const mail = await User.findOne({ email })

        if(mail) {
            throw Error('User Already Exist!')
        }

        const contact = await User.findOne({ phone })

        if(contact) {
            throw Error('Phone no Alreay Exist!')
        }

        if(!validator.isEmail(email)) {
            throw Error('Email is not Valid!')
        }

        if(!validator.isStrongPassword(Password)) {
            throw Error('Password not Strong')
        }

        if(!validator.isMobilePhone(phone)){
            throw Error('Phone no not valid!')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(Password, salt)

        const user = await User.create({email, password: hash, hex_coins: 0, phone, name})
        const token = createToken(user._id)
        await User.findByIdAndUpdate(user._id, {verifyToken: token, verifiedStatus: false})

        var link = `http://4000/api/users/verify-email/${token}`

        //send signup verification mail
        await resendinstance.emails.send({
            from: 'network@hexstaruniverse.com',
            to: user.email,
            subject: 'Verify your email address',
            html: `<html>
            <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'Poppins', sans-serif; font-size: 16px;">
            <div>
            <table style="width: 69.9834%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
            <tbody>
            <tr>
            <td style="width: 100%;">
            <p><span>Hi ${user.name},</span></p>
            <p><span>Welcome to your Hex-Star Universer Store. Please Verify your email here:</span></p>
            <a href="${link}"><button style="border-radius: 7px; background: #9333ea; color: white; width: 10rem; height: 2rem; border: none; font-weight: bold; font-size: 16px; cursor: pointer">Verify Email</button></a>
            <p>If you have not Signed up, just ignore and delete this message.<br/>To keep your account secure, please don't forward this email to anyone.<br/> See our Help Center for&nbsp;<a href="https://www.google.com" target="_blank" rel="noopener">more security tips.</a></p>
            <span><p>Happy Space Travel!</p></span>
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            </body>
            </html>`
        })

        res.status(200).json({user, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const verifySignup = async (req, res) => {

    const { token } = req.params

    try {
        const user = await User.findOne({ verifyToken: token })

        if(!user) {
            throw Error('Token is invalid!')
        }
        else {
            user.verifiedStatus = true
            user.hex_coins = 50
            user.verifyToken = undefined
            user.save()
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        if(!email || !password) {
            throw Error('All fields must be filled!')
        }

        const user = await User.findOne({ email })

        if(!user) {
            throw Error('Email not found!')
        }

        if(user.verifiedStatus === false) {
            throw Error('Email not verified!')
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            throw Error('Incorrect password!')
        }
        
        const token = createToken(user._id)

        res.status(200).json({user, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const forgotpassword = async (req, res) => {

    const { email } = req.body
    var token = ''

    try {

        if(!email) {
            throw Error('Email field should not be empty!')
        }

        const user = await User.findOne({ email })

        if(!user) {
            throw Error('Email not found!')
        }
        else {
            token = createToken_Time(user._id)
            const hash_token = crypto.createHash('sha256').update(token).digest('hex')
            await User.findByIdAndUpdate(user._id, {passwordResetToken: hash_token, passwordResetTokenExpire: Date.now() + 20 * 60 * 1000})

            //email send
            const link = `http://localhost:3000/reset-password/${token}`

            await resendinstance.emails.send({
                from: 'network@hexstaruniverse.com',
                to: user.email,
                subject: 'Hex-Star Universe store reset password',
                html: `<html>
                        <head>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                        </head>
                        <body style="font-family: 'Poppins', sans-serif; font-size: 16px;">
                        <div>
                        <table style="width: 69.9834%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                        <tr>
                        <td style="width: 100%;">
                        <p><span>Hi ${user.name},</span></p>
                        <p><span>Someone recently requested a password change for your Hex-Star Universe store account.<br/>If it was you, you can reset your password here:</span></p>
                        <a href="${link}"><button style="border-radius: 7px; background: #9333ea; color: white; width: 10rem; height: 2rem; border: none; font-weight: bold; font-size: 16px; cursor: pointer">Reset Password</button></a>
                        <p>The link is valid for only 20 minutes.</p>
                        <p>If you do not want to change your password or did not request this, just ignore and delete this message.<br/>To keep your account secure, please don't forward this email to anyone.<br/> See our Help Center for&nbsp;<a href="https://www.hexstaruniverse.com" target="_blank" rel="noopener">more security tips.</a></p>
                        <span><p>Happy Home Stay!</p></span>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </body>
                        </html>`
            })
        }

        res.status(200).json({ token })


    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const resetpassword = async (req, res) => {

    const { token } = req.params
    const { password, confirmpassword } = req.body
    
    try {

        if(!password || !confirmpassword) {
            throw Error('All fields must be filled!')
        }

        if(password !== confirmpassword) {
            throw Error('Passwords have to be same!')
        }

        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        const user = await User.findOne({passwordResetToken: hash_token, passwordResetTokenExpire: {$gt: Date.now()}})

        if(!user) {
            throw Error('Token has either expired or is invalid!')
        }

        else {
            user.passwordResetToken = undefined
            user.passwordResetTokenExpire = undefined
            user.passwordUpdateDate = Date.now()

            if(!validator.isStrongPassword(password)) {
                throw Error('Password not strong!')
            }

            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password, salt)
            user.password = hash
            await user.save()
        }

        res.status(200).json({ user })

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { SignupUser, verifySignup, loginUser, forgotpassword, resetpassword }