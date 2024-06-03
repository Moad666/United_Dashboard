const express = require('express')
const router = express.Router()

const controller = require('../Controllers/ApplicationsController')


router.post('/addApplication', controller.addApllication)
// router.get('/applications', controller.applications)

module.exports = router