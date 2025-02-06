const express = require('express');
const { getProjectStats } = require('../../controllers/projectStats.js/projectStatsController');


const router = express.Router();


router
.route('/')
.get(getProjectStats)



module.exports = router; 
