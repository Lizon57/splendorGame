const express = require('express')
const { updateUser } = require('./user.controller')

const router = express.Router()


router.put('/:id', updateUser)


module.exports = router