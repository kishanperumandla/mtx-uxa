const express = require('express');
const { login, refreshToken } = require('../../controllers/auth/authController');
const { register } = require('../../controllers/auth/authController');

const router = express.Router();

router
.route('/login')
.post(login)



router
.route('/register')
.post(register)



router
.route('/refresh-token')
.post(refreshToken)


router
.route('/protected')
.post(refreshToken)



module.exports = router

