const express = require('express')
const router = express.Router()

const controller = require('../Controllers/AuthController')

router.post('/signIn', controller.signIn)

// reset password
router.post('/resetPassword', controller.resetPassword)

module.exports = router