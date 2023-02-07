const express = require('express');
const router = express.Router()

const { createUser, login } = require('./controllers/userController')
const { addOrder, getOrder } = require('./controllers/orderController')
const { authentication, authorization, authorization1 } = require('./middlewares/auth')

// router.get('/get', function (req, res) {
//     res.send("Working fine")
// })

router.post('/add-user', createUser)
router.post('/login-user', login)
router.post('/add-order', authentication, authorization, addOrder)
router.get('/get-order', authentication, authorization1, getOrder)
module.exports = router