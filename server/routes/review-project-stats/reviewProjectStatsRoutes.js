const express = require('express');
const { getReviewProjectStats } = require('../../controllers/reviewProjectStats.js/reviewProjectStatsController');


const router = express.Router();


router
.route('/')
.get(getReviewProjectStats)



module.exports = router; 
