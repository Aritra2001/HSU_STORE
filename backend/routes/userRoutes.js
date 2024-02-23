const express = require('express')

//controller functions
const { SignupUser, verifySignup, loginUser, forgotpassword,resetpassword } = require('../controllers/userController')

const router = express.Router()

//signup route
router.post('/signup', SignupUser)

//login route
router.post('/login', loginUser)

//forgot password route
router.post('/forgot-password', forgotpassword)

//reset password route
router.post('/reset-password/:token', resetpassword)

//verify Email
router.get('/verify-email/:token', verifySignup)



module.exports = router