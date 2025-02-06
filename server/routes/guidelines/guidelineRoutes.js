const express = require('express');
const { createGuideline, getGuidelines, updateGuidelines, deleteGuideline } = require('../../controllers/guideline/guidelineController');


const router = express.Router();



router
.route("/")
.post(createGuideline)
.get(getGuidelines)
.patch(updateGuidelines)
.delete(deleteGuideline);



module.exports = router;