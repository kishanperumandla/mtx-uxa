const express = require('express');
const { createForecast, getForecast } = require('../../controllers/forecast/forecastController');


const router = express.Router();

router
.route('/')
.post(createForecast)
.get(getForecast)



module.exports = router;